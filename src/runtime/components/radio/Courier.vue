<template>
  <div
    :class="
      cn([
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : selectable
            ? 'cursor-pointer'
            : 'cursor-default'
      ])
    "
    @click="onClick"
  >
    <div
      :class="
        cn([
          'border grid gap-1.5 w-full relative items-start rounded-xl transition-all overflow-hidden',
          {
            'hover:border-flux-primary hover:ring-1 hover:ring-flux-primary':
              !disabled && !selected && !promoted && selectable,
            'bg-surfaceContainer border-outlineVariant': !promoted,
            'bg-warningYellowContainer border-flux-warningYellow hover:ring-1 hover:ring-flux-warningYellow':
              promoted,
            'bg-secondary-container border-flux-primary ring-1 ring-flux-primary':
              selected,
            'p-2.5': size === 'medium',
            'p-2': size === 'small',
            'hover:ring-2 border-none': useTheme,
            'ring-2 ring-flux-warningYellow': useTheme && selected
          },
          props.class
        ])
      "
    >
      <UiRadioThemeDecoration v-if="useTheme" />
      <UiRadioDecoration v-if="promoted && !useTheme" :selected="selected" />
      <div
        :class="[
          'flex relative gap-2',
          useTheme ? 'text-surfaceContainerLowest' : ''
        ]"
      >
        <NuxtImg
          class="w-16 aspect-video shrink-0 border bg-white border-outlineVariant rounded-md object-contain"
          :class="[promoted ? 'self-start' : 'self-center']"
          :src="
            image ??
            courier.image_link ??
            `/assets/courier-logo/${courier.service}.png`
          "
        />
        <div
          class="h-full grow flex flex-col gap-y-0.5 items-start justify-center"
        >
          <div class="flex flex-row justify-between w-full">
            <div class="flex gap-1 items-center">
              <span
                :class="{
                  'leading-5 font-semibold': true,
                  'text-sm': size === 'medium',
                  'text-xs': size === 'small'
                }"
                >{{ courier.service_name }}</span
              >
            </div>
            <span v-if="!disabled && courier.etd" class="text-xxs font-semibold"
              >{{ courier.etd }} Hari</span
            >
          </div>
          <div class="flex justify-between w-full">
            <div class="flex flex-row text-xs gap-x-1 relative items-center">
              <template v-if="finalPrice > 0 && !disabled">
                <span
                  :class="{
                    'text-surface-container-lowest': useTheme,
                    'text-flux-success': !useTheme
                  }"
                  v-text="formatNumber(finalPrice, true)"
                ></span>
                <del
                  v-if="finalPrice < basePrice"
                  :class="{
                    'text-surface-container-lowest': useTheme,
                    'text-flux-error': !useTheme
                  }"
                  v-text="formatNumber(basePrice, true)"
                ></del>
              </template>
              <template v-else-if="finalPrice == 0 && !disabled">
                <div class="font-semibold text-flux-success">
                  <span>Gratis Ongkir</span>
                </div>
              </template>
              <div
                v-else
                class="italic text-flux-error font-medium"
                v-text="disabledMessage"
              ></div>
            </div>
            <UiBadgeIconBadge
              v-if="promoted"
              class="hidden min-[400px]:flex absolute right-0 top-1/2"
              variant="success"
              size="xs"
              icon-name="material-symbols:thumb-up"
              label="Rekomendasi"
            />
          </div>
        </div>
        <slot />
      </div>
      <div
        v-if="
          ((courier.cod_calculate?.cod_cost ?? 0) > 0 ||
            (courier.cod_calculate?.cod_amount ?? 0) > 0 ||
            isShowInsurancePrice) &&
          !disabled &&
          !courier.is_mock_data
        "
        class="flex relative flex-col w-full gap-2"
      >
        <div
          v-if="isShowInsurancePrice"
          class="flex justify-between"
          :class="[useTheme ? 'text-surfaceContainerLowest' : '']"
        >
          <span class="font-normal text-xs leading-4">Biaya Asuransi</span>
          <span class="font-bold text-xs leading-4">
            {{ formatNumber(courier.cod_calculate?.insurance, true) }}
          </span>
        </div>
        <div
          v-if="courier.cod_calculate?.cod_cost"
          class="flex justify-between"
          :class="[useTheme ? 'text-surfaceContainerLowest' : '']"
        >
          <span class="font-normal text-xs leading-4"
            >Biaya COD (Termasuk PPN 11%)</span
          >
          <span class="font-bold text-xs leading-4">
            {{ formatNumber(courier.cod_calculate.cod_cost, true) }}
          </span>
        </div>
        <div
          v-if="courier.cod_calculate?.cod_amount"
          class="flex justify-between"
          :class="[useTheme ? 'text-surfaceContainerLowest' : '']"
        >
          <span class="font-normal text-xs leading-4"
            >Ditagihkan ke Penerima</span
          >
          <span class="font-bold text-xs leading-4">{{
            formatNumber(courier.cod_calculate.cod_amount, true)
          }}</span>
        </div>
      </div>
      <UiRadioCourierBadge
        v-if="!props.disabled"
        class="relative"
        :cut-off-time="courier.cut_off_time"
        :rts-rate="promoted ? undefined : courier.shipingRate"
        :cod="courier.cod"
        :first-shipment="firstShipment"
        :is-insurance-supported="courier.is_insurance_supported"
      />
      <div v-if="$slots.additional" class="relative mt-0.5">
        <slot name="additional" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { IFDataPostageCheckReguler } from '~~/services/postage-check/reguler/types'
import { storeToRefs } from 'pinia'
import type { ICourierItem } from '~/types/courier'

const globalStore = useGlobalStore()
const { getThemeExpedition } = storeToRefs(globalStore)

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    courier: {
      cost: ICourierItem['cost']
      service: ICourierItem['service']
      service_name: ICourierItem['service_name']
      etd?: ICourierItem['etd']
      discount_campaign?: ICourierItem['discount_campaign']
      cod_calculate?: IFDataPostageCheckReguler['cod_calculate']
      use_insurance?: boolean
      cut_off_time?: string
      shipingRate?: IFDataPostageCheckReguler['shipingRate']
      shipingRateNumber?: IFDataPostageCheckReguler['shipingRateNumber']
      image_link?: IFDataPostageCheckReguler['image_link']
      cod?: boolean
      is_insurance_supported?: IFDataPostageCheckReguler['is_insurance_supported']
      is_mock_data?: IFDataPostageCheckReguler['is_mock_data']
    }
    disabled?: boolean
    selected?: boolean
    disabledMessage?: string
    promoted?: boolean
    size?: 'small' | 'medium'
    image?: string
    selectable?: boolean
  }>(),
  {
    class: undefined,
    selected: false,
    disabledMessage: 'Tidak tersedia',
    size: 'medium',
    image: undefined,
    selectable: true
  }
)

const emits = defineEmits<{
  (e: 'click'): void
}>()

const useTheme = computed(
  () => props.promoted && !!getThemeExpedition.value?.status
)

const basePrice = computed(() => parseInt(props.courier.cost.toString()))

const finalPrice = computed(() => {
  if (
    !props.courier.discount_campaign ||
    props.courier.discount_campaign.discount <= 0
  )
    return basePrice.value

  return basePrice.value - props.courier.discount_campaign.discount
})

const isShowInsurancePrice = computed(() => {
  return (
    props.courier.use_insurance &&
    (props.courier.is_insurance_supported ||
      props.courier.is_insurance_supported === undefined)
  )
})

const onClick = () => {
  if (props.disabled) return
  emits('click')
}

const firstShipment = computed(() => {
  return props.courier.discount_campaign?.new_member_option === 0
})
</script>
