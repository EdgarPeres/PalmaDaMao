import { Button } from "@/components/ui/button";
import { deleteBannerAction } from "@/modules/banner/actions/banner.actions";
import type { AdminBanner } from "@/modules/banner/repositories/admin-banner.repository";

type BannerTableProps = {
  banners: AdminBanner[];
};

export function BannerTable({ banners }: BannerTableProps): React.ReactElement {
  if (banners.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Nenhum banner cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Título</th>
              <th className="px-4 py-3 font-semibold">Imagem</th>
              <th className="px-4 py-3 font-semibold">Ordem</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td className="px-4 py-3 font-medium text-slate-950">{banner.title}</td>
                <td className="max-w-64 truncate px-4 py-3 text-slate-600">{banner.imageUrl}</td>
                <td className="px-4 py-3 text-slate-600">{banner.order}</td>
                <td className="px-4 py-3">{banner.active ? "Ativo" : "Inativo"}</td>
                <td className="px-4 py-3">
                  <form action={deleteBannerAction}>
                    <input name="id" type="hidden" value={banner.id} />
                    <Button type="submit" variant="secondary">
                      Excluir
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
