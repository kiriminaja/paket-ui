<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue?: boolean,
    indeterminate?: boolean,
    label?: string,
    id?: string,
    disabled?: HTMLInputElement['disabled']
}>(), {
    modelValue: false,
    indeterminate: false
});

const emit = defineEmits(["update:modelValue"]);

const checkboxRef = ref<HTMLInputElement | null>(null);

watch(
    () => props.indeterminate,
    (newVal) => {
        if (checkboxRef.value) {
            checkboxRef.value.indeterminate = newVal;
        }
    }
);

onMounted(() => {
    if (checkboxRef.value) {
        checkboxRef.value.indeterminate = props.indeterminate;
    }
});
</script>

<template>
    <div class="inline-flex items-center shrink-0">
        <label class="flex items-center cursor-pointer relative">
            <input type="checkbox" :checked="modelValue" :disabled="disabled"
                @change="emit('update:modelValue', $event.target.checked)"
                class="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded hover:shadow-md border border-outlineVariant checked:bg-flux-primary checked:border-flux-primary"
                :id="id" />
            <Icon :name="indeterminate ? 'material-symbols:check-indeterminate-small' : 'material-symbols:check'"
                size="24px"
                class="absolute h-5 w-5 opacity-0 peer-checked:opacity-100 peer-disabled:opacity-50 peer-checked:text-onPrimary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        </label>
    </div>
</template>