<template>
    <mt-header :title="headerTitle" v-show="showMintHeader">
        <div slot="left" v-if="isstudent">
            <mt-button @click="headerConfig.left.left1.callFunction" icon="back"></mt-button>
        </div>
    </mt-header>
</template>
<script>
import {
    Header,
    Button
} from 'bh-mint-ui';

export default {

    name: 'cp-header',

    props: {
        isstudent: {
            default: true
        }
    },

    components: {
        [Header.name]: Header,
        [Button.name]: Button
    },

    data() {
        return {
            showMintHeader: false,
            headerConfig: {
                left: {
                    left1: {
                        title: '',
                        callFunction: function() {
                            BH_MIXIN_SDK.closeWebView();
                        }
                    }
                }
            },
            headerTitle: ''
        };
    },

    created() {
        if (!BH_MIXIN_SDK.bh) {
            var self = this;
            self.showMintHeader = true;
            BH_MIXIN_SDK.setNavHeader = function(config) {
                self.$nextTick(function() {
                    self.headerConfig = config;
                });
            };
            BH_MIXIN_SDK.setTitleText = function(title) {
                self.$nextTick(function() {
                    self.headerTitle = title;
                });
            };
        } else {
            BH_MIXIN_SDK.setNavHeader = BH_MOBILE_SDK.UI.setNavHeader;
        }
    }
};
</script>
<style lang="css" scoped>
</style>
