<template>
    <div
        class="descriptor"
    >
        <h1>
            {{desc.nickname}}
        </h1>
        <div
            class="half"
        >
            <Version></Version>
        </div>
        <div
            class="half"
        >
            <h3>
                Uptime
            </h3>
            {{ uptime }}
        </div>
        <div
            class="flags"
        >
            <h3>
                Flags
            </h3>
            <div
                class="flags-container"
            >
                <span
                    class="flag"
                    v-for="flag in desc.flagsObject"
                >
                    <img
                        class="flag-icon"
                        :src="'/flags/' + flag.icon + '.png'"
                    />
                    {{ flag.label }}
                </span>
            </div>
        </div>
        <div
            class="exit-policy"
        >
            <h3>
                Exit Policy
            </h3>
            <div
                class="half"
            >
                <dl
                    v-if="desc.exitPolicy.ipv4 !== []"
                >
                    <dt>
                        ipv4: 
                    </dt>
                    <dd>
                        <span
                            class="accept"
                            v-for="policy in desc.exitPolicy.ipv4.accept"
                        >
                            {{ policy }}
                        </span>
                        <span
                            class="reject"
                            v-for="policy in desc.exitPolicy.ipv4.reject"
                        >
                            {{ policy }}
                        </span>
                    </dd>
                </dl>
            </div>
            <div
                class="half"
            >
                <dl
                    v-if="desc.exitPolicy.ipv6 !== []"
                >
                    <dt>
                        ipv6: 
                    </dt>
                    <dd>
                        <span
                            class="accept"
                            v-for="policy in desc.exitPolicy.ipv6.accept"
                        >
                            {{ policy }}
                        </span>
                        <span
                            class="reject"
                            v-for="policy in desc.exitPolicy.ipv6.reject"
                        >
                            {{ policy }}
                        </span>
                    </dd>
                </dl>
            </div>
        </div>
        <div
            class="bandwidth half"
        >
            <h3>
                Bandwidth
            </h3>
            <dl>
                <dt>
                    Average
                </dt>
                <dd>
                    {{ desc.bandwidth.averageLabel }}/s
                </dd>
                <dt>
                    Burst
                </dt>
                <dd>
                    {{ desc.bandwidth.burstLabel }}/s
                </dd>
                <dt>
                    Observed
                </dt>
                <dd>
                    {{ desc.bandwidth.observedLabel }}/s
                </dd>
            </dl>
        </div>
        <div
            class="half"
        >
            <h3>
                Connections
            </h3>
            <dl>
                <dt>
                    Total
                </dt>
                <dd>
                    {{ orconn.total }}
                </dd>
                <dt>
                    Connected
                </dt>
                <dd>
                    {{ orconn.detail.CONNECTED }}
                </dd>
                <dt>
                    Launched
                </dt>
                <dd>
                    {{ orconn.detail.LAUNCHED }}
                </dd>
                <dt>
                    New
                </dt>
                <dd>
                    {{ orconn.detail.NEW }}
                </dd>
            </dl>
        </div>
        <div
            class="atlas-link"
        >
            <a
                :href="'https://metrics.torproject.org/rs.html#details/' + desc.fingerprint"
                target="_blank"
            >
                Tor Metrics
            </a>
        </div>
    </div>
</template>

<script src="./descriptor.js"></script>
<style lang="scss" src="./descriptor.scss"></style>