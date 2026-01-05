interface Services {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: Services) {
  return (
    <div className="px-4 pb-4 h-fit md:h-[325px] w-[300px] 2xl:w-[350px] xl:h-[400px] 2xl:h-[450px] border border-grey flex flex-col items-center justify-start gap-4 xl:gap-6 hover:bg-primary group">
      <div className="group-hover:bg-accent group-hover:text-white rounded-full border w-fit border-grey -mt-7 bg-white p-2 md:p-3 xl:p-4">
        {icon}
      </div>
      <h3 className="text-center group-hover:text-white! 2xl:max-w-[200px]">{title}</h3>
      <span className="h-[3px] w-[40px] bg-accent rounded-full "></span>
      <p className="max-w-[275px] 2xl:max-w-[300px] text-center group-hover:text-white">
        {description}
      </p>
    </div>
  );
}
