<template>
  <div
    v-if="paginatedData.length > 0"
    class="w-full flex flex-col justify-between"
  >
    <div class="h-[82vh] overflow-x-auto">
      <table class="min-w-full table-auto relative">
        <thead class="sticky top-0 bg-gray-300">
          <tr>
            <th class="px-4 py-2 text-left">SKU</th>
            <th class="px-4 py-2 text-left">Product Name</th>
            <th class="px-4 py-2 text-right text-xs">
              {{ selectedColumns[0] }}<br />
              sales/units <br />
              Awg Selling Price
            </th>
            <th
              v-if="selectedColumns.length > 1"
              class="px-4 py-2 text-right text-xs"
            >
              {{ selectedColumns[1] }}
              <br />
              sales/units <br />
              Awg Selling Price
            </th>
            <th class="px-4 py-2 text-right text-xs">SKU Refund Rate</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="index"
            class="h-24"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
          >
            <td class="px-4 py-2 text-left">{{ item.sku }}</td>
            <td class="px-4 py-2 text-left">{{ item.productName }}</td>

            <td
              v-if="selectedColumns.length > 1"
              class="px-4 py-2 text-right text-blue-600"
            >
              ${{ item.amount2 }}
            </td>
            <td class="px-4 py-2 text-right text-green-600">
              ${{ item.amount }}
            </td>
            <td class="px-4 py-2 text-right">{{ item.refundRate }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      class="ml-auto"
      :total-items="data.length"
      :items-per-page="itemsPerPage"
      :max-page="5"
      :current-page="currentPage"
      @update:currentPage="updateCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import pagination from '../../../components/pagination/pagination.vue';
interface Product {
  sku: string;
  productName: string;
  amount: number;
  amount2: number;
  refundRate: number;
}

interface Props {
  paginatedData: Product[];
  selectedColumns: string[];
  data: Product[];
  itemsPerPage: number;
  currentPage: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:currentPage']);

const updateCurrentPage = (page: number) => {
  emit('update:currentPage', page);
};
</script>
