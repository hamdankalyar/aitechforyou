import { permanentRedirect } from "next/navigation";

export default function TopicsPage() {
  permanentRedirect("/courses");
}
