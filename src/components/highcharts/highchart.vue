<template>
  <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import type { Ref } from 'vue';
import type { ChartOptions } from 'highcharts';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

const store = useStore();
const emit = defineEmits<{
  (e: 'date', payload: { date: string[] }): void;
}>();

interface ProductData {
  date: string;
  fbaAmount: number;
  profit: number;
  fbmAmount: number;
  fbaShippingAmount: number;
}

const selectedColumns: Ref<string[]> = ref([]);
const productInfo = computed<ProductData[]>(
  () => store.state.product.product || []
);

const chartOptions = computed<ChartOptions>(() => {
  const data: ProductData[] = Array.isArray(productInfo.value)
    ? productInfo.value
    : [];
  const sortedData = data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const categories = sortedData.map((item) =>
    dayjs(item.date).format('dddd DD.MM.YY')
  );
  const originalDates = sortedData.map((item) => item.date);
  const fbaSales = sortedData.map((item) => item.fbaAmount);
  const profit = sortedData.map((item) => item.profit);
  const fbmSales = sortedData.map((item) => item.fbmAmount);
  const fbaShipping = sortedData.map((item) => item.fbaShippingAmount);
  const totalSales = sortedData.map((item) => item.fbaAmount + item.fbmAmount);

  return {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Daily Sales',
      align: 'left',
    },
    xAxis: {
      categories,
      type: 'category',
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: `Amount ${store.state.product.currency}`,
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: '#000000',
        },
        formatter: function () {
          return ` ${store.state.product.currency} ${this.total}`;
        },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        const index = this.point.index;
        return `
              <b>${categories[index]}</b><br/>
              🏆 <b>Total Sales:</b> $${totalSales[index].toFixed(2)}<br/>
              🚚 <b>Shipping:</b> $${fbaShipping[index].toFixed(2)}<br/>
              💰 <b>Profit:</b> $${profit[index].toFixed(2)}<br/>
              📦 <b>FBA Sales:</b> $${fbaSales[index].toFixed(2)}<br/>
              🏠 <b>FBM Sales:</b> $${fbmSales[index].toFixed(2)}<br/>
            `;
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        point: {
          events: {
            click: function () {
              const index = this.index;
              const selectedDate = originalDates[index];
              if (!selectedColumns.value.includes(selectedDate)) {
                if (selectedColumns.value.length >= 2) {
                  selectedColumns.value.shift();
                }
                selectedColumns.value.push(selectedDate);
                handleColumnClick();
              }
            },
          },
        },
      },
    },
    series: [
      {
        name: 'Profit',
        data: profit,
        stack: 'sales',
        color: '#2ECC71',
      },
      {
        name: 'FBA Sales',
        data: fbaSales,
        stack: 'sales',
        color: '#4C84FF',
      },
    ],
  };
});

const handleColumnClick = () => {
  console.log(selectedColumns._rawValue);
  emit('date', { date: selectedColumns._rawValue });
};
</script>

<style></style>
