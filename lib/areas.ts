export type ServicePlace = {
  slug: string;
  /** 페이지·버튼에 쓰는 이름. 강남구, 서울 전체, 수원 권선구 */
  label: string;
  regionName: string;
  district: string;
  summary: string;
};

export type ServiceRegion = {
  name: string;
  slug: string;
  summary: string;
  places: Array<{ slug: string; label: string }>;
};

export const regions: ServiceRegion[] = [
  {
    name: "서울",
    slug: "seoul",
    summary:
      "고층 오피스와 상가가 밀집한 지역 특성상 매연 오염이 빠릅니다. 주말·야간 시공으로 영업 방해 없이 진행합니다.",
    places: [
      { slug: "seoul-all", label: "서울 전체" },
      { slug: "seoul-gangnam", label: "강남구" },
      { slug: "seoul-seocho", label: "서초구" },
      { slug: "seoul-songpa", label: "송파구" },
      { slug: "seoul-gangdong", label: "강동구" },
      { slug: "seoul-gwangjin", label: "광진구" },
      { slug: "seoul-seongdong", label: "성동구" },
      { slug: "seoul-yongsan", label: "용산구" },
      { slug: "seoul-jung", label: "중구" },
      { slug: "seoul-jongno", label: "종로구" },
      { slug: "seoul-seodaemun", label: "서대문구" },
      { slug: "seoul-mapo", label: "마포구" },
      { slug: "seoul-eunpyeong", label: "은평구" },
      { slug: "seoul-yeongdeungpo", label: "영등포구" },
      { slug: "seoul-dongjak", label: "동작구" },
      { slug: "seoul-gwanak", label: "관악구" },
      { slug: "seoul-geumcheon", label: "금천구" },
      { slug: "seoul-guro", label: "구로구" },
      { slug: "seoul-gangseo", label: "강서구" },
      { slug: "seoul-yangcheon", label: "양천구" },
      { slug: "seoul-dongdaemun", label: "동대문구" },
      { slug: "seoul-jungnang", label: "중랑구" },
      { slug: "seoul-seongbuk", label: "성북구" },
      { slug: "seoul-gangbuk", label: "강북구" },
      { slug: "seoul-dobong", label: "도봉구" },
      { slug: "seoul-nowon", label: "노원구" },
    ],
  },
  {
    name: "인천",
    slug: "incheon",
    summary:
      "해안 인접 지역은 염분과 분진으로 유리면 얼룩이 심합니다. 자재 부식을 고려한 세정제를 사용합니다.",
    places: [
      { slug: "incheon-all", label: "인천 전체" },
      { slug: "incheon-jemulpo", label: "제물포구" },
      { slug: "incheon-yeongjong-gu", label: "영종구" },
      { slug: "incheon-seohae", label: "서해구" },
      { slug: "incheon-geomdan", label: "검단구" },
      { slug: "incheon-jung", label: "중구" },
      { slug: "incheon-dong", label: "동구" },
      { slug: "incheon-michuhol", label: "미추홀구" },
      { slug: "incheon-yeonsu", label: "연수구" },
      { slug: "incheon-songdo", label: "송도" },
      { slug: "incheon-yeongjongdo", label: "영종도" },
      { slug: "incheon-namdong", label: "남동구" },
      { slug: "incheon-bupyeong", label: "부평구" },
      { slug: "incheon-gyeyang", label: "계양구" },
      { slug: "incheon-seo", label: "서구" },
      { slug: "incheon-ganghwa", label: "강화도" },
      { slug: "incheon-ongjin", label: "옹진군" },
    ],
  },
  {
    name: "경기",
    slug: "gyeonggi",
    summary:
      "아파트 단지와 전원주택, 물류·제조 시설 비중이 높습니다. 단지 단위 유리창 청소와 외벽 세척을 가장 많이 진행하는 지역입니다.",
    places: [
      { slug: "gyeonggi-all", label: "경기 전체" },
      { slug: "gyeonggi-suwon", label: "수원" },
      { slug: "gyeonggi-suwon-gwonseon", label: "수원 권선구" },
      { slug: "gyeonggi-suwon-yeongtong", label: "수원 영통구" },
      { slug: "gyeonggi-suwon-jangan", label: "수원 장안구" },
      { slug: "gyeonggi-suwon-paldal", label: "수원 팔달구" },
      { slug: "gyeonggi-seongnam", label: "성남" },
      { slug: "gyeonggi-seongnam-sujeong", label: "성남 수정구" },
      { slug: "gyeonggi-seongnam-jungwon", label: "성남 중원구" },
      { slug: "gyeonggi-bundang", label: "분당" },
      { slug: "gyeonggi-uijeongbu", label: "의정부" },
      { slug: "gyeonggi-anyang", label: "안양" },
      { slug: "gyeonggi-anyang-dongan", label: "안양 동안구" },
      { slug: "gyeonggi-anyang-manan", label: "안양 만안구" },
      { slug: "gyeonggi-bucheon", label: "부천" },
      { slug: "gyeonggi-gwangmyeong", label: "광명" },
      { slug: "gyeonggi-pyeongtaek", label: "평택" },
      { slug: "gyeonggi-dongducheon", label: "동두천" },
      { slug: "gyeonggi-ansan", label: "안산" },
      { slug: "gyeonggi-ansan-danwon", label: "안산 단원구" },
      { slug: "gyeonggi-ansan-sangnok", label: "안산 상록구" },
      { slug: "gyeonggi-goyang", label: "고양" },
      { slug: "gyeonggi-goyang-deogyang", label: "고양 덕양구" },
      { slug: "gyeonggi-goyang-ilsandong", label: "고양 일산동구" },
      { slug: "gyeonggi-goyang-ilsanseo", label: "고양 일산서구" },
      { slug: "gyeonggi-ilsan", label: "일산" },
      { slug: "gyeonggi-gwacheon", label: "과천" },
      { slug: "gyeonggi-guri", label: "구리" },
      { slug: "gyeonggi-namyangju", label: "남양주" },
      { slug: "gyeonggi-osan", label: "오산" },
      { slug: "gyeonggi-siheung", label: "시흥" },
      { slug: "gyeonggi-gunpo", label: "군포" },
      { slug: "gyeonggi-uiwang", label: "의왕" },
      { slug: "gyeonggi-hanam", label: "하남" },
      { slug: "gyeonggi-yongin", label: "용인" },
      { slug: "gyeonggi-yongin-giheung", label: "용인 기흥구" },
    ],
  },
];

export const places: ServicePlace[] = regions.flatMap((region) =>
  region.places.map((place) => ({
    slug: place.slug,
    label: place.label,
    regionName: region.name,
    district: place.label,
    summary: region.summary,
  })),
);

export const getPlace = (slug: string) =>
  places.find((place) => place.slug === slug);

export const servicePlaceHref = (serviceSlug: string, placeSlug: string) =>
  `/service/${serviceSlug}/${placeSlug}`;
