<template>
  <!-- Rendered inside an off-screen host div managed by useShareImage -->
  <div
    ref="cardEl"
    :style="{
      width: '1080px',
      height: '1350px',
      overflow: 'hidden',
      backgroundColor: '#09090b', /* zinc-950 */
      fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <!-- ── Header stripe ── -->
    <div
      :style="{
        backgroundColor: '#ef4444', /* red-500 */
        padding: '28px 56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: '0',
      }"
    >
      <span
        :style="{
          fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
          fontWeight: '900',
          fontSize: '36px',
          letterSpacing: '0em',
          textTransform: 'uppercase',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }"
      >Voto Podre</span>
      <span
        :style="{
          fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
          fontWeight: '700',
          fontSize: '22px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.75)',
          whiteSpace: 'nowrap',
        }"
      >voto-podre.com.br</span>
    </div>

    <!-- ── Body ── -->
    <div
      :style="{
        flex: '1',
        padding: '52px 56px 40px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '0',
      }"
    >
      <!-- Deputy card -->
      <template v-if="mode === 'deputado' && deputado">
        <!-- Photo + name block -->
        <div :style="{ display: 'flex', alignItems: 'flex-start', gap: '40px', marginBottom: '48px' }">
          <!-- Initials avatar — avoids CORS issues with camara.leg.br photo URLs -->
          <div
            :style="{
              width: '140px',
              height: '140px',
              flexShrink: '0',
              border: '3px solid #ef4444',
              backgroundColor: '#27272a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }"
          >
            <span
              :style="{
                fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '900',
                fontSize: '48px',
                color: '#ef4444',
                textTransform: 'uppercase',
                lineHeight: '1',
              }"
            >{{ initials }}</span>
          </div>
          <div :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '8px' }">
            <p
              :style="{
                fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '900',
                fontSize: '44px',
                lineHeight: '1.05',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '14px',
              }"
            >{{ deputado.nome }}</p>
            <p
              :style="{
                fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '700',
                fontSize: '24px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#a1a1aa', /* zinc-400 */
                marginBottom: '18px',
              }"
            >{{ deputado.siglaPartido }} · {{ deputado.siglaUf }}</p>
            <div
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#ef4444',
                padding: '8px 8px 8px 8px',
                alignSelf: 'flex-start',
              }"
            >
              <span
                :style="{
                  fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
                  fontWeight: '900',
                  fontSize: '18px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }"
              >{{ totalPautas }} {{ totalPautas === 1 ? 'VOTO PODRE' : 'VOTOS PODRES' }}</span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div :style="{ width: '100%', height: '2px', backgroundColor: '#27272a', marginBottom: '36px', flexShrink: '0' }" />

        <!-- Negative pautas list -->
        <div :style="{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0', minHeight: '0' }">
          <div
            v-for="pauta in displayedNegativas"
            :key="pauta.id"
            :style="{
              borderLeft: '3px solid #ef4444',
              paddingLeft: '24px',
              paddingTop: '18px',
              paddingBottom: '18px',
              borderBottom: '1px solid #18181b',
            }"
          >
            <p
              :style="{
                fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '700',
                fontSize: '16px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ef4444',
                marginBottom: '6px',
              }"
            >PAUTA PODRE APOIADA</p>
            <p
              :style="{
                fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '700',
                fontSize: '28px',
                lineHeight: '1.2',
                textTransform: 'uppercase',
                color: '#ffffff',
              }"
            >{{ pauta.nome }}</p>
          </div>

          <!-- Positive pautas (voted against) -->
          <div
            v-for="pauta in displayedPositivas"
            :key="pauta.id"
            :style="{
              borderLeft: '3px solid #22c55e',
              paddingLeft: '24px',
              paddingTop: '18px',
              paddingBottom: '18px',
              borderBottom: '1px solid #18181b',
            }"
          >
            <p
              :style="{
                fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '700',
                fontSize: '16px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#22c55e',
                marginBottom: '6px',
              }"
            >PAUTA POSITIVA NEGADA</p>
            <p
              :style="{
                fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '700',
                fontSize: '28px',
                lineHeight: '1.2',
                textTransform: 'uppercase',
                color: '#ffffff',
              }"
            >{{ pauta.nome }}</p>
          </div>

          <!-- Overflow notice -->
          <p
            v-if="overflowCount > 0"
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '700',
              fontSize: '20px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#71717a', /* zinc-500 */
              paddingTop: '20px',
              paddingLeft: '28px',
            }"
          >+ {{ overflowCount }} {{ overflowCount === 1 ? 'pauta' : 'pautas' }} em voto-podre.com.br/deputado/{{ deputado.id }}</p>
        </div>
      </template>

      <!-- Pauta card -->
      <template v-else-if="mode === 'pauta' && pauta">
        <!-- Tipo label + title -->
        <div
          :style="{
            borderLeft: pauta.tipo === 'positiva' ? '5px solid #22c55e' : '5px solid #ef4444',
            paddingLeft: '32px',
            marginBottom: '44px',
          }"
        >
          <p
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '900',
              fontSize: '16px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: pauta.tipo === 'positiva' ? '#22c55e' : '#ef4444',
              marginBottom: '14px',
            }"
          >{{ pauta.tipo === 'positiva' ? 'PAUTA POSITIVA' : 'PAUTA PODRE' }}</p>
          <p
            :style="{
              fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '900',
              fontSize: '48px',
              lineHeight: '1.05',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '20px',
            }"
          >{{ pauta.nome }}</p>
          <p
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '400',
              fontSize: '22px',
              lineHeight: '1.5',
              color: '#a1a1aa',
            }"
          >{{ truncatedDescricao }}</p>
        </div>

        <!-- Stat badge -->
        <div
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: pauta.tipo === 'positiva' ? '#15803d' : '#7f1d1d',
            padding: '20px 32px',
            marginBottom: '48px',
            alignSelf: 'flex-start',
          }"
        >
          <span
            :style="{
              fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '900',
              fontSize: '56px',
              color: '#ffffff',
              lineHeight: '1',
            }"
          >{{ deputadosCount }}</span>
          <span
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '700',
              fontSize: '18px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '200px',
              lineHeight: '1.3',
            }"
          >{{ pauta.tipo === 'positiva' ? 'DEPUTADOS VOTARAM CONTRA' : 'DEPUTADOS APOIARAM ESTA PAUTA' }}</span>
        </div>

        <!-- Top parties -->
        <div v-if="(topParties ?? []).length" :style="{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0' }">
          <p
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '700',
              fontSize: '13px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#52525b',
              marginBottom: '16px',
            }"
          >PARTIDOS QUE MAIS {{ pauta.tipo === 'positiva' ? 'VOTARAM CONTRA' : 'APOIARAM' }}</p>
          <div
            v-for="party in (topParties ?? [])"
            :key="party.sigla"
            :style="{
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #18181b',
            }"
          >
            <!-- Party name + count row -->
            <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }">
              <span
                :style="{
                  fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
                  fontWeight: '900',
                  fontSize: '20px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }"
              >{{ party.sigla }}</span>
              <span
                :style="{
                  fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#a1a1aa',
                }"
              >{{ party.count }}</span>
            </div>
            <!-- Bar row (full width) -->
            <div :style="{ width: '100%', backgroundColor: '#18181b', height: '10px' }">
              <div
                :style="{
                  height: '100%',
                  backgroundColor: pauta.tipo === 'positiva' ? '#22c55e' : '#ef4444',
                  width: `${(party.count / ((topParties ?? [])[0]?.count ?? 1)) * 100}%`,
                }"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- Pauta by UF card -->
      <template v-else-if="mode === 'pauta-by-uf' && pauta">
        <!-- Tipo label + title (compact) -->
        <div
          :style="{
            borderLeft: pauta.tipo === 'positiva' ? '5px solid #22c55e' : '5px solid #ef4444',
            paddingLeft: '32px',
            marginBottom: ufTitleMargin,
          }"
        >
          <p
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '900',
              fontSize: '14px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: pauta.tipo === 'positiva' ? '#22c55e' : '#ef4444',
              marginBottom: '12px',
            }"
          >{{ pauta.tipo === 'positiva' ? 'PAUTA POSITIVA' : 'PAUTA PODRE' }}</p>
          <p
            :style="{
              fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '900',
              fontSize: ufTitleFontSize,
              lineHeight: '1.05',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }"
          >{{ pauta.nome }}</p>
        </div>

        <!-- State + count badge -->
        <div
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '28px',
            backgroundColor: pauta.tipo === 'positiva' ? '#15803d' : '#7f1d1d',
            padding: ufBadgePadding,
            marginBottom: ufBadgeMargin,
            alignSelf: 'flex-start',
          }"
        >
          <span
            :style="{
              fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '900',
              fontSize: ufStateFontSize,
              color: '#ffffff',
              lineHeight: '1',
              letterSpacing: '-0.02em',
            }"
          >{{ uf }}</span>
          <div :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
            <span
              :style="{
                fontFamily: '\'Syne\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '900',
                fontSize: ufCountFontSize,
                color: '#ffffff',
                lineHeight: '1',
              }"
            >{{ deputadosCount }}</span>
            <span
              :style="{
                fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
                fontWeight: '700',
                fontSize: '13px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: '1.3',
                maxWidth: '180px',
              }"
            >{{ pauta.tipo === 'positiva' ? 'DEPUTADOS QUE VOTARAM CONTRA' : 'DEPUTADOS QUE APOIARAM' }}</span>
          </div>
        </div>

        <!-- Names grid -->
        <div :style="{ flex: '1', minHeight: '0' }">
          <p
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '700',
              fontSize: '13px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#52525b',
              marginBottom: '14px',
            }"
          >DEPUTADOS FLAGRADOS EM {{ uf }}</p>
          <div
            :style="{
              display: 'grid',
              gridTemplateColumns: ufGridCols,
              columnGap: '12px',
              rowGap: '0',
            }"
          >
            <div
              v-for="item in displayedItems"
              :key="item.nome"
              :style="{
                paddingTop: ufCellPadV,
                paddingBottom: ufCellPadV,
                borderBottom: '1px solid #18181b',
                borderLeft: '2px solid ' + (pauta.tipo === 'positiva' ? '#22c55e' : '#ef4444'),
                paddingLeft: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                overflow: 'hidden',
              }"
            >
              <span
                :style="{
                  fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
                  fontWeight: '600',
                  fontSize: ufNameSize,
                  color: '#d4d4d8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }"
              >{{ item.nome }}</span>
              <span
                :style="{
                  fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
                  fontWeight: '700',
                  fontSize: ufPartySize,
                  color: '#52525b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  lineHeight: '1',
                }"
              >{{ item.siglaPartido }}</span>
            </div>
          </div>
          <p
            v-if="namesOverflowCount > 0"
            :style="{
              fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
              fontWeight: '700',
              fontSize: '14px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#71717a',
              paddingTop: '14px',
            }"
          >+ {{ namesOverflowCount }} em voto-podre.com.br/pauta/{{ pauta.id }}</p>
        </div>
      </template>
    </div>

    <!-- ── Footer watermark ── -->
    <div
      :style="{
        padding: '24px 56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #27272a',
        flexShrink: '0',
      }"
    >
      <span
        :style="{
          fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
          fontWeight: '700',
          fontSize: '18px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#52525b',
          whiteSpace: 'nowrap',
        }"
      >Siga no instagram: @voto.podre</span>
      <span
        :style="{
          fontFamily: '\'DM Sans\', \'Helvetica Neue\', Arial, sans-serif',
          fontWeight: '400',
          fontSize: '18px',
          color: '#3f3f46',
        }"
      >Gerado em {{ formattedDate }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Deputado, Pauta } from '@/types';

const MAX_PAUTAS = 8;

const props = defineProps<{
  mode: 'deputado' | 'pauta' | 'pauta-by-uf';
  deputado?: Deputado;
  pautas?: Pauta[];
  pauta?: Pauta;
  deputadosCount?: number;
  topParties?: { sigla: string; count: number }[];
  uf?: string;
  deputadoItems?: { nome: string; siglaPartido: string }[];
}>();

const cardEl = ref<HTMLElement | null>(null);

// cardEl is kept for potential future use but the composable now uses host.firstElementChild

// ── Deputy mode ──────────────────────────────────────────────────────────────

const pautasNegativas = computed(() =>
  (props.pautas ?? []).filter((p) => p.tipo === 'negativa'),
);
const pautasPositivas = computed(() =>
  (props.pautas ?? []).filter((p) => p.tipo === 'positiva'),
);

const totalPautas = computed(() => (props.pautas ?? []).length);

const initials = computed(() => {
  const name = props.deputado?.nome ?? '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return (parts[0]?.[0] ?? '?').toUpperCase();
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
});

const displayedNegativas = computed(() =>
  pautasNegativas.value.slice(0, MAX_PAUTAS),
);

// Fill remaining slots with positivas after negativas
const remainingSlots = computed(() =>
  Math.max(0, MAX_PAUTAS - displayedNegativas.value.length),
);
const displayedPositivas = computed(() =>
  pautasPositivas.value.slice(0, remainingSlots.value),
);

const overflowCount = computed(() => {
  const shown = displayedNegativas.value.length + displayedPositivas.value.length;
  return Math.max(0, totalPautas.value - shown);
});

// ── Pauta mode ────────────────────────────────────────────────────────────────

const truncatedDescricao = computed(() => {
  const d = props.pauta?.descricao ?? '';
  return d.length > 220 ? d.slice(0, 217) + '…' : d;
});

// ── Pauta by UF mode ─────────────────────────────────────────────────────────

const MAX_NAMES = 48;

const displayedItems = computed(() =>
  (props.deputadoItems ?? []).slice(0, MAX_NAMES),
);

const namesOverflowCount = computed(() =>
  Math.max(0, (props.deputadoItems ?? []).length - MAX_NAMES),
);

// Responsive layout — switch to 3 cols + compact header when count > 20
const ufUseThreeCols = computed(() => (props.deputadoItems ?? []).length > 20);

const ufTitleFontSize  = computed(() => ufUseThreeCols.value ? '34px' : '44px');
const ufTitleMargin   = computed(() => ufUseThreeCols.value ? '20px' : '36px');
const ufBadgePadding  = computed(() => ufUseThreeCols.value ? '14px 28px' : '20px 36px');
const ufBadgeMargin   = computed(() => ufUseThreeCols.value ? '28px' : '44px');
const ufStateFontSize = computed(() => ufUseThreeCols.value ? '52px' : '72px');
const ufCountFontSize = computed(() => ufUseThreeCols.value ? '34px' : '44px');

const ufGridCols    = computed(() => ufUseThreeCols.value ? '1fr 1fr 1fr' : '1fr 1fr');
const ufCellPadV    = computed(() => ufUseThreeCols.value ? '5px' : '8px');
const ufNameSize    = computed(() => ufUseThreeCols.value ? '13px' : '16px');
const ufPartySize   = computed(() => ufUseThreeCols.value ? '10px' : '11px');

// ── Shared ────────────────────────────────────────────────────────────────────

const formattedDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
});
</script>
