import { ref, computed } from 'vue';
import { useDeputadosStore } from '@/stores/useDeputadosStore';
import { usePautasPodresStore } from '@/stores/usePautasPodresStore';
import type { Deputado, PautaPodre } from '@/types';

export function useDeputadoDetails(id: string | number) {
  const deputadosStore = useDeputadosStore();
  const pautasStore = usePautasPodresStore();
  const deputado = ref<Deputado | null>(null);

  deputado.value = deputadosStore.deputados.find((d: Deputado) => String(d.id) === String(id)) || null;

  const pautasDoDeputado = computed<PautaPodre[]>(() => {
    if (!deputado.value) return [];
    return pautasStore.pautasPodres.filter((pauta: PautaPodre) => pauta.idsDeputadosPodres.includes(deputado.value!.id));
  });

  return {
    deputado,
    pautasDoDeputado,
  };
}
