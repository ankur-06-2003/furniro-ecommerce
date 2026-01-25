const Overlay = ({ showFilter, setShowFilter }) => {
  return (
    <div
      onClick={() => setShowFilter(!showFilter)}
      className="bg-accent/20 w-full h-full lg:hidden backdrop-blur-2xl fixed inset-0 z-8 pointer-none:"
    />
  );
};

export default Overlay;
