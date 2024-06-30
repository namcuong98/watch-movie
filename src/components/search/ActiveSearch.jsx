import Seaching from "./Seaching";

const ActiveSearch = ({ searchRef, isSearch, setIsSearch }) => {
  return (
    <>
      <div className="cursor-pointer" ref={searchRef}>
        {!isSearch ? (
          <i className="fa-solid fa-magnifying-glass"></i>
        ) : (
          <Seaching />
        )}
      </div>
    </>
  );
};

export default ActiveSearch;
