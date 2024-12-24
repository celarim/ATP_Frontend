<script setup>
import {ref,reactive} from 'vue';
const addCount = 1;
const addBtn = () => {
    addCount++;
}

</script>

<template>
    <div class="page-container">
        <!-- Left Section -->
        <div class="left-section">
            <h2>새로운 콘텐츠 추가</h2>
            <p>여기에 새로운 내용을 추가하세요.</p>
        </div>

        <!-- Right Section -->
        <div class="right-section">
            <!-- Field Labels Row -->
            <div class="field-labels">
                <div class="stock-name-label">Stock</div>
                <div class="quantity-label">Quantity</div>
                <div class="amount-label">Amount</div>
                <div class="date-label">Date</div>
                <div class="count-label">Count</div>
                <div class="add-label"></div> <!-- Add 버튼 자리 --> 
            </div>

            <!-- Field Inputs Row -->
            <div id="field-wrapper">
                <!-- Initial Field Container -->
                <div class="field-container" v-for = "list in addCount" >
                    <div class="field-input stock-name-input">
                        <input type="text" placeholder="Enter stock name" />
                    </div>
                    <div class="field-input quantity-input">
                        <input type="number" placeholder="0" />
                    </div>
                    <div class="field-input date-input">
                        <button class="date-button">
                            <img src="../images/calendar.svg" alt="Calendar" />
                        </button>
                        <input type="date" class="hidden-date-picker" />
                    </div>
                    <!-- Add Button -->
                    <div class="field-input add-field">
                        <button @click="addBtn" class="add-field-button" id="add-field-button" type="button">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import './portCreate.css'
</style>