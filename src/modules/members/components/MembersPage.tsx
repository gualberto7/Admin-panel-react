import PageHeader from "@/shared/components/PageHeader";
import { useGymStore } from "@/modules/gym/store/gym.store";
export default function MembersPage() {
  const { selectedGym } = useGymStore();
  console.log("selectedGym", selectedGym);
  return (
    <div>
      <PageHeader title="Clientes" />
    </div>
  );
}
