import Seaching from "./Seaching";

const ActiveSearch = ({ isSearch, setIsSearch }) => {
  return (
    <>
      <div className="cursor-pointer">
        {!isSearch ? (
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => setIsSearch(true)}
          ></i>
        ) : (
          <Seaching setIsSearch={setIsSearch} />
        )}
      </div>
    </>
  );
};

export default ActiveSearch;
