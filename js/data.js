const fetchData = async () => {
    return await fetch("https://japceibal.github.io/japflix_api/movies-data.json")
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.error(error));
  };
  
  export default fetchData;