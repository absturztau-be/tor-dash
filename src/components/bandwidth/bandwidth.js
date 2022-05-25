import apiService from "../../services/api.service";
import { Bar } from "vue-chartjs";
import * as moment from "moment";
import filesize from "filesize"
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const MAX_DATA = 50;

const Bandwidth = {
    components: {
        Bar
    },
    data () {
        return {
            traffic: [],
            width: "800px",
            height: "400px",
            chartData: {
                labels: Array.apply(null, Array(MAX_DATA)).map(() => { return 0; }),
                datasets: [
                    {
                        label: "Read",
                        borderColor: "#f87979",
                        backgroundColor: "#f87979",
                        data: Array.apply(null, Array(MAX_DATA)).map(() => { return 0; }),
                        fill: true
                    },
                    {
                        label: "Written",
                        borderColor: "#79f879",
                        backgroundColor: "#79f879",
                        data: Array.apply(null, Array(MAX_DATA)).map(() => { return 0; }),
                        fill: true
                    }
                ]
            },
            chartOptions: {
                animation: {
                    duration: 0
                },
                scales: {
                    x: {
                        stacked: true
                    }
                }
            },
            interval: null,
            total: {
                read: 0,
                written: 0
            },
            timestamp: 0
        };
    },
    mounted () {
        this.interval = window.setInterval(() => {
            this.load()
        }, 1000);
    },
    unmounted () {
        window.clearInterval(this.interval);
    },
    methods: {
        load () {
            apiService.getTraffic().then((result) => {
                let read = 0;
                let written = 0;
                if (this.total.read !== 0) {
                    read = result.read - this.total.read;
                    written = result.written - this.total.written;
                    this.chartData.datasets[0].data.push(-read / 1024);
                    this.chartData.datasets[1].data.push(written / 1024);
                    this.chartData.datasets[0].data.shift();
                    this.chartData.datasets[1].data.shift();
                }
                this.total.read = result.read;
                this.total.written = result.written;
                this.total.readLabel = filesize(result.read);
                this.total.writtenLabel = filesize(result.written);
                this.timestamp = moment(parseInt(result.timestamp), ["X", "x"]).format("DD.MM.YYYY HH:mm:ss");
                this.chartData.labels.push(moment(parseInt(result.timestamp), ["X", "x"]).format("HH:mm:ss"));
                this.chartData.labels.shift();
                this.traffic.push(result);
                this.$refs.graph.updateChart();
            });
        }
    }
};

export default Bandwidth;