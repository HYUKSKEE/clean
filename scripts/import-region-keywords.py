#!/usr/bin/env python3
"""엑셀 지역 키워드(A열)를 시군구 slug 별 메타 목록으로 나눕니다."""

from __future__ import annotations

import json
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path
import zipfile
import tempfile
import shutil

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

CANONICAL_TO_SLUG = {
    "서울특별시": "seoul-all",
    "인천광역시": "incheon-all",
    "경기도": "gyeonggi-all",
    "인천광역시 강화군": "incheon-ganghwa",
    "인천광역시 검단구": "incheon-geomdan",
    "인천광역시 계양구": "incheon-gyeyang",
    "인천광역시 남동구": "incheon-namdong",
    "인천광역시 미추홀구": "incheon-michuhol",
    "인천광역시 부평구": "incheon-bupyeong",
    "인천광역시 서해구": "incheon-seohae",
    "인천광역시 연수구": "incheon-yeonsu",
    "인천광역시 영종구": "incheon-yeongjong-gu",
    "인천광역시 옹진군": "incheon-ongjin",
    "인천광역시 제물포구": "incheon-jemulpo",
    "경기도 가평군": "gyeonggi-gapyeong",
    "경기도 고양시": "gyeonggi-goyang",
    "경기도 고양시 덕양구": "gyeonggi-goyang-deogyang",
    "경기도 고양시 일산동구": "gyeonggi-goyang-ilsandong",
    "경기도 고양시 일산서구": "gyeonggi-goyang-ilsanseo",
    "경기도 과천시": "gyeonggi-gwacheon",
    "경기도 광명시": "gyeonggi-gwangmyeong",
    "경기도 광주시": "gyeonggi-gwangju",
    "경기도 구리시": "gyeonggi-guri",
    "경기도 군포시": "gyeonggi-gunpo",
    "경기도 김포시": "gyeonggi-gimpo",
    "경기도 남양주시": "gyeonggi-namyangju",
    "경기도 동두천시": "gyeonggi-dongducheon",
    "경기도 부천시": "gyeonggi-bucheon",
    "경기도 부천시 소사구": "gyeonggi-bucheon-sosa",
    "경기도 부천시 오정구": "gyeonggi-bucheon-ojeong",
    "경기도 부천시 원미구": "gyeonggi-bucheon-wonmi",
    "경기도 성남시": "gyeonggi-seongnam",
    "경기도 성남시 분당구": "gyeonggi-seongnam-bundang",
    "경기도 성남시 수정구": "gyeonggi-seongnam-sujeong",
    "경기도 성남시 중원구": "gyeonggi-seongnam-jungwon",
    "경기도 수원시": "gyeonggi-suwon",
    "경기도 수원시 권선구": "gyeonggi-suwon-gwonseon",
    "경기도 수원시 영통구": "gyeonggi-suwon-yeongtong",
    "경기도 수원시 장안구": "gyeonggi-suwon-jangan",
    "경기도 수원시 팔달구": "gyeonggi-suwon-paldal",
    "경기도 시흥시": "gyeonggi-siheung",
    "경기도 안산시": "gyeonggi-ansan",
    "경기도 안산시 단원구": "gyeonggi-ansan-danwon",
    "경기도 안산시 상록구": "gyeonggi-ansan-sangnok",
    "경기도 안성시": "gyeonggi-anseong",
    "경기도 안양시": "gyeonggi-anyang",
    "경기도 안양시 동안구": "gyeonggi-anyang-dongan",
    "경기도 안양시 만안구": "gyeonggi-anyang-manan",
    "경기도 양주시": "gyeonggi-yangju",
    "경기도 양평군": "gyeonggi-yangpyeong",
    "경기도 여주시": "gyeonggi-yeoju",
    "경기도 연천군": "gyeonggi-yeoncheon",
    "경기도 오산시": "gyeonggi-osan",
    "경기도 용인시": "gyeonggi-yongin",
    "경기도 용인시 기흥구": "gyeonggi-yongin-giheung",
    "경기도 용인시 수지구": "gyeonggi-yongin-suji",
    "경기도 용인시 처인구": "gyeonggi-yongin-cheoin",
    "경기도 의왕시": "gyeonggi-uiwang",
    "경기도 의정부시": "gyeonggi-uijeongbu",
    "경기도 이천시": "gyeonggi-icheon",
    "경기도 파주시": "gyeonggi-paju",
    "경기도 평택시": "gyeonggi-pyeongtaek",
    "경기도 포천시": "gyeonggi-pocheon",
    "경기도 하남시": "gyeonggi-hanam",
    "경기도 화성시": "gyeonggi-hwaseong",
    "경기도 화성시 동탄구": "gyeonggi-hwaseong-dongtan",
    "경기도 화성시 만세구": "gyeonggi-hwaseong-manse",
    "경기도 화성시 병점구": "gyeonggi-hwaseong-byeongjeom",
    "경기도 화성시 효행구": "gyeonggi-hwaseong-hyohaeng",
}

for name in (
    "강남구 강동구 강북구 강서구 관악구 광진구 구로구 금천구 노원구 도봉구 "
    "동대문구 동작구 마포구 서대문구 서초구 성동구 성북구 송파구 양천구 "
    "영등포구 용산구 은평구 종로구 중구 중랑구"
).split():
    roman = {
        "강남구": "gangnam", "강동구": "gangdong", "강북구": "gangbuk", "강서구": "gangseo",
        "관악구": "gwanak", "광진구": "gwangjin", "구로구": "guro", "금천구": "geumcheon",
        "노원구": "nowon", "도봉구": "dobong", "동대문구": "dongdaemun", "동작구": "dongjak",
        "마포구": "mapo", "서대문구": "seodaemun", "서초구": "seocho", "성동구": "seongdong",
        "성북구": "seongbuk", "송파구": "songpa", "양천구": "yangcheon",
        "영등포구": "yeongdeungpo", "용산구": "yongsan", "은평구": "eunpyeong",
        "종로구": "jongno", "중구": "jung", "중랑구": "jungnang",
    }[name]
    CANONICAL_TO_SLUG[f"서울특별시 {name}"] = f"seoul-{roman}"

EXTRA_SLUG_ALIASES = {
    "gyeonggi-bundang": ["분당", "판교", "성남 분당", "성남분당", "성남 판교", "성남판교"],
    "gyeonggi-seongnam-bundang": ["분당", "판교"],
    "gyeonggi-ilsan": ["일산", "고양 일산", "고양일산"],
    "gyeonggi-yongin-suji": ["수지", "용인 수지", "용인수지"],
    "gyeonggi-yongin-giheung": ["기흥", "용인 기흥", "용인기흥"],
    "gyeonggi-hwaseong-dongtan": ["동탄", "화성 동탄", "화성동탄"],
    "incheon-songdo": ["송도", "인천 송도", "인천송도"],
    "incheon-yeongjongdo": ["영종도", "인천 영종도", "인천영종도"],
    "incheon-ganghwa": ["강화도", "인천 강화도", "인천강화도", "강화군"],
    "incheon-jemulpo": ["인천 중구", "인천중구", "인천 동구", "인천동구"],
    "incheon-yeongjong-gu": ["인천 중구", "인천중구"],
    "incheon-seohae": ["인천 서구", "인천서구"],
    "incheon-geomdan": ["인천 서구", "인천서구"],
    "incheon-michuhol": ["인천 남구", "인천남구"],
    "gyeonggi-gwangju": ["경기광주", "경기 광주"],
}


LIFESTYLE_TO_SLUGS = {
    "성남시 분당구": ["gyeonggi-seongnam-bundang", "gyeonggi-bundang"],
    "고양시 일산동구·일산서구": [
        "gyeonggi-ilsan",
        "gyeonggi-goyang-ilsandong",
        "gyeonggi-goyang-ilsanseo",
    ],
    "화성시 동탄구 일대": ["gyeonggi-hwaseong-dongtan", "gyeonggi-hwaseong"],
    "성남시 분당구 일대": ["gyeonggi-bundang", "gyeonggi-seongnam-bundang"],
    "용인시 수지구": ["gyeonggi-yongin-suji"],
    "용인시 기흥구": ["gyeonggi-yongin-giheung"],
    "연수구 송도동 일대": ["incheon-songdo", "incheon-yeonsu"],
    "영종구 일대": ["incheon-yeongjong-gu", "incheon-yeongjongdo"],
    "강화군 일부": ["incheon-ganghwa"],
    "제물포구 일부 + 영종구": ["incheon-jemulpo", "incheon-yeongjong-gu", "incheon-jung"],
    "제물포구 일부": ["incheon-jemulpo", "incheon-dong"],
    "서해구 + 검단구": ["incheon-seohae", "incheon-geomdan", "incheon-seo"],
    "미추홀구": ["incheon-michuhol"],
}


def load_rows(xlsx: Path):
    tmp = Path(tempfile.mkdtemp())
    try:
        with zipfile.ZipFile(xlsx) as zf:
            zf.extractall(tmp)
        ss = ET.parse(tmp / "xl/sharedStrings.xml")
        strings = [
            "".join(t.text or "" for t in si.findall(".//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t"))
            for si in ss.getroot()
        ]
        sheet = ET.parse(tmp / "xl/worksheets/sheet1.xml")
        rows = []
        for row in sheet.getroot().findall("m:sheetData/m:row", NS):
            cells = {}
            for c in row.findall("m:c", NS):
                col = "".join(ch for ch in c.get("r") if ch.isalpha())
                t = c.get("t")
                v = c.find("m:v", NS)
                if t == "s" and v is not None:
                    cells[col] = strings[int(v.text)]
                elif v is not None:
                    cells[col] = v.text
            if cells.get("C") in (None, "구분"):
                continue
            rows.append(
                {
                    "a": cells.get("A") or "",
                    "c": cells.get("C") or "",
                    "d": cells.get("D") or "",
                }
            )
        return rows
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main():
    xlsx = Path("/Users/kevin/Downloads/키워드.xlsx")
    records = load_rows(xlsx)
    parents = sorted(CANONICAL_TO_SLUG, key=len, reverse=True)

    def parent_of(value: str) -> str | None:
        for item in parents:
            if value == item or value.startswith(item + " "):
                return item
        return None

    def slugs_for(row: dict[str, str]) -> list[str]:
        mapped = LIFESTYLE_TO_SLUGS.get(row["d"])
        if mapped:
            return mapped
        parent = parent_of(row["d"])
        if parent:
            return [CANONICAL_TO_SLUG[parent]]
        return []

    aliases: dict[str, set[str]] = defaultdict(set)
    for slug, extras in EXTRA_SLUG_ALIASES.items():
        aliases[slug].update(extras)

    missing = 0
    for row in records:
        slugs = slugs_for(row)
        if not slugs:
            missing += 1
            continue
        for slug in slugs:
            aliases[slug].add(row["a"])

    out = {slug: sorted(values) for slug, values in sorted(aliases.items())}
    dest = Path("data/place-aliases.json")
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    placed = {name for values in out.values() for name in values}
    excel_a = {row["a"] for row in records}
    print(
        f"wrote {dest} slugs={len(out)} names={sum(len(v) for v in out.values())} "
        f"excel_a={len(excel_a)} covered={len(excel_a & placed)} missing_rows={missing}"
    )


if __name__ == "__main__":
    main()
