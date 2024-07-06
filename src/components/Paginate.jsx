import { Pagination } from "antd";

const Paginate = ({ pagination, setPaginate, paginate }) => {
  const handleChange = (paginate) => {
    setPaginate(paginate);
  };

  return (
    <div>
      <div>
        {pagination && (
          <Pagination
            className="paginate"
            total={
              pagination.total_page !== undefined
                ? pagination.total_page
                : pagination * 10
            }
            showQuickJumper
            showSizeChanger={false}
            current={paginate}
            onChange={(paginate) => {
              handleChange(paginate);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Paginate;
