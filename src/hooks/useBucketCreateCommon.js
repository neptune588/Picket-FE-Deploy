import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useBucketCreateCommon() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [imgData, setImgData] = useState({
    previewImg: null,
    postImg: null,
  });
  const [valueData, setValueData] = useState({
    bucketTitle: "", //condition ->  value === "",null,undifined x
    bucketContent: "", //condition ->  value === "",null,undifined x
    categoryList: [], //condition -> length === 0 x
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [calanderModalState, setCalanderModalState] = useState(false);

  const handleValueChange = (e) => {
    setValueData({ ...valueData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const { files } = e.target;

    const fileRead = new FileReader();

    //다 읽고나면 실행되는 콜백
    fileRead.onload = ({ target }) => {
      setImgData((prev) => {
        return { ...prev, previewImg: target.result };
      });
    };
    fileRead.readAsDataURL(files[0]);
    setImgData((prev) => {
      return { ...prev, postImg: files[0] };
    });
  };

  return {
    date,
    imgData,
    valueData,
    submitLoading,
    calanderModalState,
    setDate,
    setImgData,
    setValueData,
    setSubmitLoading,
    setCalanderModalState,
    handleValueChange,
    handleImageUpload,
  };
}
