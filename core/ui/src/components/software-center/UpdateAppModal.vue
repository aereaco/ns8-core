<template>
  <NsModal
    size="default"
    :visible="isShown"
    @modal-hidden="onModalHidden"
    @primary-click="updateModule"
    class="no-pad-modal"
  >
    <template v-if="app" slot="title">{{
      $t("software_center.update_app", { app: app.name })
    }}</template>
    <template v-if="app && instance" slot="content">
      <cv-form @submit.prevent="updateModule">
        <div
          v-html="
            $t('software_center.about_to_update_app', {
              app: instanceLabel,
              version: instance.version,
              newVersion: appVersion,
            })
          "
        ></div>
        <div v-if="error.updateModule">
          <NsInlineNotification
            kind="error"
            :title="$t('action.update-module')"
            :description="error.updateModule"
            :showCloseButton="false"
          />
        </div>
      </cv-form>
    </template>
    <template slot="secondary-button">{{ $t("common.cancel") }}</template>
    <template slot="primary-button">{{
      $t("software_center.update")
    }}</template>
  </NsModal>
</template>

<script>
import { UtilService, TaskService, IconService } from "@nethserver/ns8-ui-lib";
import to from "await-to-js";

export default {
  name: "UpdateAppModal",
  mixins: [UtilService, TaskService, IconService],
  props: {
    isShown: Boolean,
    app: { type: [Object, null] },
    instance: { type: [Object, null] },
  },
  data() {
    return {
      error: {
        updateModule: "",
      },
    };
  },
  computed: {
    instanceLabel() {
      if (!this.instance) {
        return "";
      }

      if (this.instance.ui_name) {
        return `${this.instance.ui_name} (${this.instance.id})`;
      } else {
        return this.instance.id;
      }
    },
    appVersion() {
      if (this.app.versions.length) {
        return this.app.versions[0].tag;
      } else {
        return "latest";
      }
    },
  },
  methods: {
    async updateModule() {
      this.error.updateModule = "";
      const taskAction = "update-module";
      const eventId = this.getUuid();

      // register to task error
      this.$root.$once(
        `${taskAction}-aborted-${eventId}`,
        this.updateModuleAborted
      );

      this.$root.$once(
        `${taskAction}-completed-${eventId}`,
        this.updateModuleCompleted
      );

      const res = await to(
        this.createClusterTask({
          action: taskAction,
          data: {
            module_url: this.app.source + ":" + this.appVersion,
            instances: [this.instance.id],
          },
          extra: {
            title: this.$t("software_center.update_app", {
              app: this.instance.ui_name || this.instance.id,
            }),
            description: this.$t("software_center.updating_to_version", {
              version: this.appVersion,
            }),
            eventId,
          },
        })
      );
      const err = res[0];

      if (err) {
        console.error(`error creating task ${taskAction}`, err);
        this.error.updateModule = this.getErrorMessage(err);
        return;
      }

      // emit event to close modal
      this.$emit("hide");
    },
    updateModuleAborted(taskResult, taskContext) {
      console.error(`${taskContext.action} aborted`, taskResult);
    },
    updateModuleCompleted() {
      // reload instances and highlight new instance
      this.$emit("updateCompleted");
    },
    onModalHidden() {
      this.clearErrors();
      this.$emit("hide");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/carbon-utils";
</style>
