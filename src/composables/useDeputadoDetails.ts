import { ref, computed } from 'vue';
import { useDeputadosStore } from '@/stores/useDeputadosStore';
import { usePautasStore } from '@/stores/usePautasStore';
import type { Deputado, Pauta } from '@/types';

export function useDeputadoDetails(id: string | number) {
  const deputadosStore = useDeputadosStore();
  const pautasStore = usePautasStore();
  const deputado = ref<Deputado | null>(null);

  deputado.value = deputadosStore.deputados.find((d: Deputado) => String(d.id) === String(id)) || null;

  const pautasDoDeputado = computed<Pauta[]>(() => {
    if (!deputado.value) return [];
    return pautasStore.pautas.filter((pauta: Pauta) => pauta.idsDeputadosPodres.includes(deputado.value!.id));
  });

  return {
    deputado,
    pautasDoDeputado,
  };
}
