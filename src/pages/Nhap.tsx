import { useEffect, useState } from "react";
import { api } from "../services/AxiosInstance";

const NhapApi = () => {
  const [articles, setArticles] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(300);
  const [pageSize] = useState<number>(5);
  const fetchGlobalArticles = async () => {
    const offset = (currentPage - 1) * pageSize;
    let apiUrl = `${process.env.REACT_APP_API_URL}/articles?limit=${pageSize}&offset=${offset}`;
    const response = await api.get(apiUrl);
    const { articles, articlesCount } = response.data;
    setArticles(articles);
  };
  useEffect(() => {
    fetchGlobalArticles();
  }, []);
  console.log("articles in nhap", articles);

  return (
    <div>
      <h1>Nhap</h1>
      {/* <Form.Item label="Tag List">
        <AutoComplete
          // onChange={handleTagInputChange}
          // onKeyDown={handleTagInputKeyDown}
          // onSelect={handleTagInputConfirm}
          options={tagsPopular.map((tag: any) => ({ value: tag }))}
          filterOption={(inputValue: any, option: any) =>
            option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        >
          <Input
            placeholder="Enter tags"
            onPressEnter={handleTagInputKeyDown}
            value={inputTag} // Set the value of the input field
            onChange={handleTagInputChange}
          />
        </AutoComplete>
      </Form.Item> */}
    </div>
  );
};

export default NhapApi;
