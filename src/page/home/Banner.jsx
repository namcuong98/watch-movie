export const banners = [
  {
    id: 1,
    describe:
      "Peter Parker đã bị lộ mặt và không còn có thể tách biệt cuộc sống bình thường của mình với những yêu cầu cao của việc trở thành một Siêu anh hùng. Khi anh ta yêu cầu sự giúp đỡ từ Doctor Strange, mọi thứ càng trở nên nguy hiểm hơn, buộc anh ta phải khám phá ra ý nghĩa thực sự của việc trở thành Người Nhện.",
    logo: "/trailer/nguoi-nhen-khong-con-nha/logo-nguoi-nhen-khong-con-nha.webp",
    trailer:
      "/trailer/nguoi-nhen-khong-con-nha/trailer-nguoi-nhen-khong-con-nha.mp4",
    name: "nguoi-nhen-khong-con-nha",
  },
  {
    id: 2,
    describe:
      "Phim One Piece live action là phiên bản chuyển thể từ bộ truyện tranh cùng tên nổi tiếng của Nhật Bản, được viết và minh họa bởi Oda Eiichiro và xuất bản lần đầu vào năm 1997. Đây là một bộ phim truyền hình trực tuyến của Mỹ.",
    logo: "/trailer/one-piece-live-action/logo-one-piece-live-action.png",
    trailer: "/trailer/one-piece-live-action/trailer-one-piece-live-action.mp4",
    name: "one-piece-live-action",
  },
  {
    id: 3,
    describe:
      "Trong một thế giới mà những thợ săn, những con người sở hữu khả năng phép thuật, phải chiến đấu với những con quái vật chết người để bảo vệ loài người khỏi sự hủy diệt, một thợ săn nổi tiếng yếu ớt tên là Sung Jin-woo thấy mình ở trong một cuộc đấu tranh sinh tồn dường như bất tận.",
    logo: "/trailer/toi-thang-cap-mot-minh/logo-toi-thang-cap-mot-minh.png",
    trailer:
      "/trailer/toi-thang-cap-mot-minh/trailer-toi-thang-cap-mot-minh.mp4",
    name: "toi-thang-cap-mot-minh",
  },
  {
    id: 4,
    describe:
      "Diễn biến của Kimetsu No Yaiba - Thanh Gươm Diệt Quỷ Season 3 sẽ dẫn đến cuộc đại chiến lớn là cuộc chạm trán với Thượng Huyền Ngũ và Thượng Huyền Tứ ở Làng Thợ Rèn.",
    logo: "/trailer/thanh-guom-diet-quy-duong-den-lang-ren-guom/logo-thanh-guom-diet-quy-duong-den-lang-ren-guom.png",
    trailer:
      "/trailer/thanh-guom-diet-quy-duong-den-lang-ren-guom/trailer-thanh-guom-diet-quy-duong-den-lang-ren-guom.mp4",
    name: "thanh-guom-diet-quy-duong-den-lang-ren-guom",
  },
  {
    id: 5,
    describe:
      "Mitsuha Miyamizu, một nữ sinh trung học, khao khát được sống cuộc sống của một cậu bé ở thành phố Tokyo nhộn nhịp một giấc mơ hoàn toàn trái ngược với cuộc sống hiện tại của cô ở nông thôn.",
    logo: "/trailer/ten-cau-la-gi/logo-ten-cau-la-gi.png",
    trailer: "/trailer/ten-cau-la-gi/trailer-ten-cau-la-gi.mp4",
    name: "ten-cau-la-gi",
  },
];

export const getRandomBanner = () => {
  const randomIndex = Math.floor(Math.random() * banners.length);
  return banners[randomIndex];
};
