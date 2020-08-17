<template>
	<div>
	<a-divider>{{this.rightObj.doctype==1?'个人权限':'团队成员权限'}}</a-divider>
		<a-row>
			<a-col span="6" align="left">查看文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="watch_right" v-model="rightObj.watch_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">修改文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.modify_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">分享文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.share_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">参与讨论</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.discuss_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>

		<a-divider>所有人权限</a-divider>
		<a-row>
			<a-col span="6" align="left">查看文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.others_modify_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">修改文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.others_modify_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">分享文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.others_share_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">参与讨论</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.others_discuss_right" :disabled="rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>

		<a-divider></a-divider>
		<a-button type="default" style="float:left;margin-left:10%" @click="load_right(propRightObj)">重置</a-button>
		<a-button type="primary" style="float:right;margin-right:10%" @click="commit()">提交</a-button>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'privilegePane',

	data() {
		return{
			rightObj:{
				watch_right: false,
				modify_right: false,
				share_right: false,
				discuss_right: false,

				others_watch_right: false,
				others_modify_right: false,
				others_share_right: false,
				others_discuss_right: false,

				isleader: false,
				doctype:-1,
				usertype:-1,
			},
		};
	},

	props: {
		propRightObj:{},
	},

	watch: {
		propRightObj: {
			handler(newVal) {
				console.log("watch saw changes in propRightObj");
				console.log(this);
				this.load_right(newVal);
			},
			deep: true,
			immediate: true,
		}
	},

	methods: {
		commit() {
			if(this.rightObj.doctype==1) {
				let formData = new FormData();
				formData.append("DocumentID", this.$router.params.id);
				alert(this.$router.params.id)
				formData.append("username", localStorage.getItem("token"));
				formData.append("share_right",this.rightObj.share_right);
				formData.append("watch_right",this.rightObj.watch_right);
				formData.append("discuss_right",this.rightObj.discuss_right);
				formData.append("modify_right",this.rightObj.modify_right);
				let config = {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				};
				axios
					.post("http://localhost:5000/api/modify_personal_doc_right/", formData, config)
					.then(function (response) {
						if (response.data.message=='success') {
							console.log("程坤")
						} else {
							console.log("失败");
						}
					})
					.catch(function (error) {
						console.log("失败", error);
					});
			} else {
				if(this.rightObj.isleader) {
					let formData = new FormData();
					formData.append("DocumentID", this.$router.params.id);
					formData.append("username", localStorage.getItem("token"));
					formData.append("share_right",this.rightObj.share_right);
					formData.append("watch_right",this.rightObj.watch_right);
					formData.append("discuss_right",this.rightObj.discuss_right);
					formData.append("modify_right",this.rightObj.modify_right);
					formData.append("others_share_right",this.rightObj.others_share_right);
					formData.append("others_watch_right",this.rightObj.others_watch_right);
					formData.append("others_discuss_right",this.rightObj.others_discuss_right);
					formData.append("others_modify_right",this.rightObj.others_modify_right);
					let config = {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					};
					axios
						.post("http://localhost:5000/api/modify_group_doc_right/", formData, config)
						.then(function (response) {
							if (response.data.message=='success') {
								console.log("程坤")
							} else {
								console.log("失败");
							}
						})
						.catch(function (error) {
							console.log("失败", error);
						});
				}else {
					console.log("权限不足")
				}
			}
		},
		load_right(newVal) {
			this.rightObj.discuss_right=newVal.discuss_right;
			this.rightObj.doctype=newVal.doctype;
			this.rightObj.modify_right=newVal.modify_right;
			this.rightObj.others_discuss_right=newVal.others_discuss_right;
			this.rightObj.others_modify_right=newVal.others_modify_right;
			this.rightObj.others_share_right=newVal.others_share_right;
			this.rightObj.others_watch_right=newVal.others_watch_right;
			this.rightObj.share_right=newVal.share_right;
			this.rightObj.usertype=newVal.usertype;
			this.rightObj.watch_right=newVal.watch_right;
			this.rightObj.isleader=newVal.isleader;
		}
	},
}
</script>