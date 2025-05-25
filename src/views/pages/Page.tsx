const Page = ({ pageNumber }: { pageNumber: number | string }) => {
  return (
    <>
      <main>
        <h1>Page: {pageNumber}</h1>
        <p>{`${pageNumber}`.repeat(10)}</p>
      </main>
    </>
  );
};

export default Page;
