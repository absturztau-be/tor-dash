import apiService from "../../services/api.service";
import Version from "../version/version.vue";
import filesize from "filesize";
import * as moment from "moment";
import * as momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Descriptor = {
    components: {
        Version
    },
    data () {
        return {
            desc: {
                fingerprint: "",
                flags: [],
                exitPolicy: {
                    ipv4: [],
                    ipv6: []
                },
                bandwidth: {
                    all: 0,
                    average: 0,
                    burst: 0,
                    observed: 0
                }
            },
            orconn: {
                total: 0,
                detail: {
                    CONNECTED: 0,
                    LAUNCHED: 0,
                    NEW: 0
                }
            },
            uptime: "0s",
            interval: null
        };
    },
    mounted () {
        apiService.getDesc().then((result) => {
            result.flagsObject = [];
            result.flags.forEach((flag) => {
                result.flagsObject.push({
                    label: flag,
                    icon: flag.toLowerCase().replace(" ", "")
                });
            })
            result.bandwidth.averageLabel = filesize(result.bandwidth.average, {base: 2});
            result.bandwidth.burstLabel = filesize(result.bandwidth.burst, {base: 2});
            result.bandwidth.observedLabel = filesize(result.bandwidth.observed, {base: 2});
            this.desc = result;
        });
        this.interval = setInterval(() => {
            apiService.getUptime().then((result) => {
                this.uptime = moment.duration(result.uptime, "seconds").format("D [days] h [hrs] m [min] s [sec]");
            });
            apiService.getOrConn().then((result) => {
                this.orconn = result;
            });
        }, 1000);
    },
    unounted () {
        clearInterval(this.interval);
    }
};

export default Descriptor;