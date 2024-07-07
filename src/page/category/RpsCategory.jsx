import { Button, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import {
  getData,
  saveFilm,
  saveWordSearch,
  takeWordSearch,
} from "../../utils/axios";
import Paginate from "../../components/Paginate";
import { useResponsiveScreen } from "../../utils/Responsive";
import { useNavigate } from "react-router-dom";

const RpsCategory = () => {
  const [param, setParam] = useState("hanh-dong");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const items = [
    {
      key: 1,
      item: "hanh-dong",
      label: "Hành động",
      onClick: () => {
        setParam("hanh-dong");
      },
    },
    {
      key: 2,
      item: "phieu-luu",
      label: "Phiêu lưu",
      onClick: () => {
        setParam("phieu-luu");
      },
    },
    {
      key: 3,
      item: "hoat-hinh",
      label: "Hoạt hình",
      onClick: () => {
        setParam("hoat-hinh");
      },
    },
    {
      key: 4,
      item: "hai",
      label: "Hài",
      onClick: () => {
        setParam("hai");
      },
    },
    {
      key: 5,
      item: "hinh-su",
      label: "Hình sự",
      onClick: () => {
        setParam("hinh-su");
      },
    },
    {
      key: 6,
      item: "tai-lieu",
      label: "Tài liệu",
      onClick: () => {
        setParam("tai-lieu");
      },
    },
    {
      key: 7,
      item: "chinh-kich",
      label: "Chính kịch",
      onClick: () => {
        setParam("chinh-kich");
      },
    },
    {
      key: 8,
      item: "gia-dinh",
      label: "Gia đình",
      onClick: () => {
        setParam("gia-dinh");
      },
    },
    {
      key: 9,
      item: "gia-tuong",
      label: "Giả Tưởng",
      onClick: () => {
        setParam("gia-tuong");
      },
    },
    {
      key: 10,
      item: "lich-su",
      label: "Lịch sử",
      onClick: () => {
        setParam("lich-su");
      },
    },
    {
      key: 11,
      item: "kinh-di",
      label: "Kinh dị",
      onClick: () => {
        setParam("kinh-di");
      },
    },
    {
      key: 12,
      item: "nhac",
      label: "Nhạc",
      onClick: () => {
        setParam("nhac");
      },
    },
    {
      key: 13,
      item: "bi-an",
      label: "Bí ẩn",
      onClick: () => {
        setParam("bi-an");
      },
    },
    {
      key: 14,
      item: "lang-man",
      label: "Lãng mạn",
      onClick: () => {
        setParam("lang-man");
      },
    },
    {
      key: 15,
      item: "khoa-hoc-vien-tuong",
      label: "Khoa Học viễn Tưởng",
      onClick: () => {
        setParam("khoa-hoc-vien-tuong");
      },
    },
    {
      key: 16,
      item: "gay-can",
      label: "Gay cấn",
      onClick: () => {
        setParam("gay-can");
      },
    },
    {
      key: 17,
      item: "chien-tranh",
      label: "Chiến tranh",
      onClick: () => {
        setParam("chien-tranh");
      },
    },
    {
      key: 18,
      item: "tam-ly",
      label: "Tâm lý",
      onClick: () => {
        setParam("tam-ly");
      },
    },
    {
      key: 19,
      item: "tinh-cam",
      label: "Tình cảm",
      onClick: () => {
        setParam("tinh-cam");
      },
    },
    {
      key: 20,
      item: "co-trang",
      label: "Cổ trang",
      onClick: () => {
        setParam("co-trang");
      },
    },
    {
      key: 21,
      item: "mien-tay",
      label: "Miền tây",
      onClick: () => {
        setParam("mien-tay");
      },
    },
    {
      key: 22,
      item: "phim-18+",
      label: "Phim 18+",
      onClick: () => {
        setParam("phim-18+");
      },
    },
  ];

  const { isDesktop, isTablet, isMobile, isSmallMobile } =
    useResponsiveScreen();

  const getGridColsClass = () => {
    if (isDesktop) {
      return `grid-cols-4`;
    } else if (isTablet || isMobile) {
      return `grid-cols-3`;
    } else if (isSmallMobile) {
      return `grid-cols-2`;
    }
    return `grid-cols-1`;
  };
  const gridColsClass = getGridColsClass();

  const handleClick = (item) => {
    saveFilm(item);
    if (takeWordSearch) {
      navigate(`/new-movies/${item}`);
      saveWordSearch(null);
    } else {
      navigate(`${item}`);
    }
  };

  const nameCategory = items.filter((category) => category.item === param);

  useEffect(() => {
    getData({
      url: `the-loai/${param}?page=${page}`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param, page]);

  return (
    <div className="mt-[50px] relative">
      <div className="top-[50px] flex justify-between items-center right-0">
        <div className="flex text_small mt-5 p-8">
          <p>Thể loại: </p>
          <span className="ml-2">Phim {nameCategory[0].label}</span>
        </div>
        <Dropdown
          className=""
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
        >
          <Button className="button_category">Chọn Thể loại phim</Button>
        </Dropdown>
      </div>
      <div className={`grid ${gridColsClass} grid-flow-row gap-4 `}>
        {data.items &&
          data.items.map((item, index) => {
            return (
              <div
                key={index}
                className=" mt-[10px] mb-10 w-full cursor-pointer "
                onClick={() => handleClick(item.slug)}
              >
                <div className="w-full h-[300px] relative rounded-tr-md rounded-tl-md overflow-hidden wrap-img">
                  <p className="absolute text-xs rounded-sm top-0 right-0 bg-[#f2bf83] text-[#333] font-bold p-1 z-10">
                    Chỉ có trên IQTV
                  </p>
                  <div className="mb-3 ">
                    <div className="relative img_play top_up">
                      <img
                        title={item.name}
                        className="w-full h-[300px] object-cover "
                        src={item.thumb_url}
                        alt="Loading"
                      />
                      <div className="w-full h-full absolute top-0 left-0 hidden z-30">
                        <i className="fa-solid fa-play play"></i>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="absolute bottom-[20px] left-[6px] text-[#fff] z-10 flex items-center gap-2">
                        <i className="fa-solid fa-star"></i>
                        <p>{(8 + Math.random() * 2).toFixed(1)}</p>
                      </div>
                      <div className="absolute bottom-[20px] right-[6px] rounded-sm p-1 text-xs font-bold bg-[#e66f20] z-10 flex items-center gap-2">
                        <p className="">{item.current_episode}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start">
                    <span>
                      Tên phim:
                      <span className="text-base text-[#cbcbcc] ml-2">
                        {item.name}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-center mt-14">
        <Paginate
          pagination={data.paginate}
          setPaginate={setPage}
          paginate={page}
        />
      </div>
    </div>
  );
};

export default RpsCategory;
