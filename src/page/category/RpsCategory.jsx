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
      //   item: "hanh-dong",
      label: "Hành động",
      onClick: () => {
        setParam("hanh-dong");
      },
    },
    {
      key: 2,
      //   item: "phieu-luu",
      label: "Phiêu lưu",
      onClick: () => {
        setParam("phieu-luu");
      },
    },
    {
      key: 3,
      //   item: "hoat-hinh",
      label: "Hoạt hình",
      onClick: () => {
        setParam("hoat-hinh");
      },
    },
    {
      key: 4,
      //   item: "hai",
      label: "Hài",
      onClick: () => {
        setParam("hai");
      },
    },
    {
      key: 5,
      //   item: "hinh-su",
      label: "Hình sự",
      onClick: () => {
        setParam("hinh-su");
      },
    },
    {
      key: 6,
      //   item: "tai-lieu",
      label: "Tài liệu",
      onClick: () => {
        setParam("tai-lieu");
      },
    },
    {
      key: 7,
      //   item: "chinh-kich",
      label: "Chính kịch",
      onClick: () => {
        setParam("chinh-kich");
      },
    },
    {
      key: 8,
      //   item: "gia-dinh",
      label: "Gia đình",
      onClick: () => {
        setParam("gia-dinh");
      },
    },
    {
      key: 9,
      //   item: "gia-tuong",
      label: "Giả Tưởng",
      onClick: () => {
        setParam("gia-tuong");
      },
    },
    {
      key: 10,
      //   item: "lich-su",
      label: "Lịch sử",
      onClick: () => {
        setParam("lich-su");
      },
    },
    {
      key: 11,
      //   item: "kinh-di",
      label: "Kinh dị",
      onClick: () => {
        setParam("kinh-di");
      },
    },
    {
      key: 12,
      //   item: "nhac",
      label: "Nhạc",
      onClick: () => {
        setParam("nhac");
      },
    },
    {
      key: 13,
      //   item: "bi-an",
      label: "Bí ẩn",
      onClick: () => {
        setParam("bi-an");
      },
    },
    {
      key: 14,
      //   item: "lang-man",
      label: "Lãng mạn",
      onClick: () => {
        setParam("lang-man");
      },
    },
    {
      key: 15,
      //   item: "khoa-hoc-vien-tuong",
      label: "Khoa Học viễn Tưởng",
      onClick: () => {
        setParam("khoa-hoc-vien-tuong");
      },
    },
    {
      key: 16,
      //   item: "gay-can",
      label: "Gay cấn",
      onClick: () => {
        setParam("gay-can");
      },
    },
    {
      key: 17,
      //   item: "chien-tranh",
      label: "Chiến tranh",
      onClick: () => {
        setParam("chien-tranh");
      },
    },
    {
      key: 18,
      //   item: "tam-ly",
      label: "Tâm lý",
      onClick: () => {
        setParam("tam-ly");
      },
    },
    {
      key: 19,
      //   item: "tinh-cam",
      label: "Tình cảm",
      onClick: () => {
        setParam("tinh-cam");
      },
    },
    {
      key: 20,
      //   item: "co-trang",
      label: "Cổ trang",
      onClick: () => {
        setParam("co-trang");
      },
    },
    {
      key: 21,
      //   item: "mien-tay",
      label: "Miền tây",
      onClick: () => {
        setParam("mien-tay");
      },
    },
    {
      key: 22,
      //   item: "phim-18+",
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

  useEffect(() => {
    getData({
      url: `the-loai/${param}?page=${page}`,
    })
      .then((res) => {
        setData(res.data);
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param, page]);

  return (
    <div className="mt-[50px] relative">
      <div className="top-[50px] flex justify-end right-0">
        <Dropdown
          className=""
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
        >
          <Button>bottomLeft</Button>
        </Dropdown>
      </div>
      <div className={`grid ${gridColsClass} grid-flow-row gap-4`}>
        {data.items &&
          data.items.map((item) => {
            return (
              <>
                <div
                  onClick={() => handleClick(item.slug)}
                  className="cursor-pointer"
                >
                  <div className="w-full h-full">
                    <img
                      className="w-full h-full"
                      src={item.thumb_url}
                      alt=""
                    />
                  </div>
                </div>
              </>
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
