<template>
  <div>
    <div class="flex justify-end">
      <label for="days">Tarih Filtresi:</label>
      <select id="days" v-model="selectedDays">
        <option :value="60">Last 60 Days</option>
        <option :value="30">Last 30 Days</option>
        <option :value="14">Last 14 Days</option>
        <option :value="7">Last 7 Days</option>
      </select>
    </div>
    <highchart @date="handleColumnClick" />

    <product-sku
      :paginatedData="paginatedData"
      :selectedColumns="selectedColumns"
      :data="data"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :onClickHandler="onClickHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
import api from '../plugins/axios';
import dayjs from 'dayjs';
import highchart from '../components/highcharts/highchart.vue';
import productSku from '../components/table/product-sku/product-sku.vue';

interface Product {
  sku: { sku: string };
  productName: string;
  amount: number;
  amount2?: number;
  refundRate: number;
}

const store = useStore();

const data = ref<Product[]>([]);
const selectedColumns = ref<string[]>([]);
const selectedDays = ref<number>(30);
const currentPage = ref<number>(1);
const itemsPerPage = 10;

onMounted(async () => {
  await fetchProductList();
  const state = store.state.auth.user;
  console.log('user');
});
const userInfo = computed(() => store.state.auth?.user.store[0] || null);

watch(selectedDays, async (newValues) => {
  await fetchProductList();
});

const fetchProductList = async () => {
  await store.dispatch('product/productList', selectedDays.value);
};

const handleColumnClick = async (event: { date: string[] }) => {
  selectedColumns.value = event.date.map((date) =>
    dayjs(date).format('dd - DD.MM.YY')
  );
  try {
    const response = await api.post('/data/daily-sales-sku-list', {
      customDateData: null,
      day: selectedDays.value,
      excludeYoYData: true,
      marketplace: userInfo.value.marketplaceName,
      requestStatus: 0,
      sellerId: userInfo.value.storeId,
      isDaysCompare: event.date.length > 1 ? 1 : 0,
      pageNumber: 1,
      pageSize: 30,
      salesDate: event.date[0],
      salesDate2: event.date.length > 1 ? event.date[1] : '',
    });
    console.log('productList', response);

    const productList = response.data.Data.item.skuList;
    const refundRates = await fetchRefundRate(productList);

    data.value = productList.map((product: Product, index: number) => ({
      ...product,
      refundRate: refundRates[index]?.refundRate || 0,
      date: event.date,
    }));
    console.log('data', data.value);
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

const fetchRefundRate = async (skuList: Product[]) => {
  try {
    const response = await api.post('/data/get-sku-refund-rate', {
      marketplace: userInfo.value.marketplaceName,
      sellerId: userInfo.value.storeId,
      skuList,
      requestedDay: 0,
    });
    return response.data?.Data || [];
  } catch (error) {
    console.error('Error fetching refund rates:', error);
    return [];
  }
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return data.value.slice(start, start + itemsPerPage);
});

const onClickHandler = (page: number) => {
  currentPage.value = page;
};
</script>
