import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className={`flex flex-col mx-5 md:mx-24 ${className}`}>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm bg-cyan-950 text-white text-surface rounded-lg dark:bg-customCyan">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
