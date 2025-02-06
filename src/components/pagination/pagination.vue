<template>
  <vue-awesome-paginate
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :max-pages-shown="maxPage"
    :model-value="currentPage"
    @update:model-value="handlePageClick"
  />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  maxPage?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:currentPage', page: number): void;
}>();

const handlePageClick = (page: number) => {
  if (page > 0) {
    emit('update:currentPage', page);
  }
};
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
