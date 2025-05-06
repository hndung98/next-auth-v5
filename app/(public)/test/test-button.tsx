"use client";

async function getData(apiUrl: string) {
  return fetch(apiUrl)
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();
        case 403:
          return { message: "forbidden." };
        case 404:
          return { message: "not found." };

        default:
          return { message: "something went wrong." };
      }
    })
    .catch((res) => {
      return { error: res };
    });
}

export const FetchButton = ({
  text,
  apiUrl,
}: {
  text: string;
  apiUrl: string;
}) => {
  const handleClick = async () => {
    try {
      const data = await getData(apiUrl);
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="cursor-pointer bg-amber-200 text-gray-900 p-1 text-2xl max-w-[312px]"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
