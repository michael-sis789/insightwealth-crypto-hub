import { redirect } from "next/navigation";
import { routeFromSlug } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function ZhAliasPage({ params }: PageProps) {
  redirect(routeFromSlug((await params).slug));
}
