<template>
    <div class="card">
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Products</span>
                    <Button icon="pi pi-refresh" rounded raised @click="loadProducts" />
                </div>
            </template>
            <Column field="name" header="Name"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img :src="slotProps.data.imagen" :alt="slotProps.data.name" class="w-24 rounded" />
                </template>
            </Column>
            <Column field="precioVenta" header="Price">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.precioVenta) }}
                </template>
            </Column>
            <Column field="description" header="Description"></Column>
            <Column field="stock" header="Stock"></Column>
            <Column header="Status">
                <template #body="slotProps">
                    <Tag :value="getStockStatus(slotProps.data)" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <template #footer> In total there are {{ products.length }} products. </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/services/product-service';
import { Column, DataTable, Button, Tag } from 'primevue';

const productService = new ProductService();
const products = ref([]);

const loadProducts = async () => {
    try {
        const response = await productService.products();
        products.value = response.data;
    } catch (error) {
        console.error('Error loading products:', error);
    }
};

onMounted(() => {
    loadProducts();
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getStockStatus = (product) => {
    if (product.stock > 10) return 'INSTOCK';
    if (product.stock > 0) return 'LOWSTOCK';
    return 'OUTOFSTOCK';
};

const getSeverity = (product) => {
    switch (getStockStatus(product)) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return null;
    }
};
</script>
