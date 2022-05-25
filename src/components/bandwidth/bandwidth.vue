<template>
    <div
        class="bandwidth"
    >
        <h3>Traffic</h3>
        <div
            class="graph"
        >
            <Bar
                ref="graph"
                :chart-data="chartData"
                :chart-options="chartOptions"
                :width="width"
                :height="height"
            />
        </div>
        <div
            class="total"
        >
            <h4>
                Total Data read / Total Data written
            </h4>
            <span
                class="time"
            >
                {{ timestamp }}: 
            </span>
            <span
                class="read"
            >
                {{ total.readLabel }}
            </span>
            /
            <span
                class="written"
            >
                {{ total.writtenLabel }}
            </span>
        </div>
    </div>
</template>

<script src="./bandwidth.js"></script>
<style lang="scss" src="./bandwidth.scss"></style>