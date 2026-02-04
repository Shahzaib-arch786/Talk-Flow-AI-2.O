import AdminLayout from "../layout/AdminLayout";
import KnowledgeHeader from "../components/KnowledgeHeader";
import StatusCards from "../components/StatusCards";
import UploadIntentsCard from "../components/UploadIntentsCard";
import RecentUploadsTable from "../components/RecentUploadsTable";
import useKnowledge from "../hooks/useKnowledge";

export default function Knowledge() {
  const { status, lastUpdated, uploads } = useKnowledge();

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto bg-gray-100 p-6 rounded-xl">
        
        <KnowledgeHeader />

        <StatusCards
          status={status}
          lastUpdated={lastUpdated}
        />

        <UploadIntentsCard />

        <RecentUploadsTable uploads={uploads} />

      </div>
    </AdminLayout>
  );
}
