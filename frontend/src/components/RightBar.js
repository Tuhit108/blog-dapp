import "./Rightbar.css";
import { Input } from "antd";
const {Search} = Input;

function Rightbar() {

  return (
    <>
      <div className="rightbarContent">
          <Search
            className="search-input"
            placeholder="Enter text to search"
            allowClear
          />
      </div>
    </>
  );
}

export default Rightbar;
