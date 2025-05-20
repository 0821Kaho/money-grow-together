
const AcademicSection = () => {
  return (
    <section className="py-12 container mx-auto px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">学術監修</p>
        <div className="flex justify-center">
          <img 
            src="https://www.tohoku.ac.jp/japanese/common_img/loogo.png" 
            alt="東北大学" 
            className="h-12 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AcademicSection;
