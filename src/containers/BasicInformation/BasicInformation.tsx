import { getProducts } from "../../api/testAxios";
import "./BasicInformation.scss";
import { useEffect } from "react";

function BasicInformation() {
  useEffect(() => {
    const getData = async () => {
      const data = await getProducts();
      if (data) {
        console.log(data);
      }
    };
    getData();
  }, []);
  return <div className="BasicInformation">BasicInformation</div>;
}

export default BasicInformation;
