<template>
	<div>
		<div v-show="this.rightObj.doctype!=1">
			<a-divider>团队成员权限</a-divider>
			<a-row>
				<a-col span="6" align="left">修改文档</a-col>
				<a-col span="18" align="right">
					<a-radio-group name="modify_right" v-model="rightObj.modify_right" :disabled="!rightObj.isleader">
						<a-radio :value="true">有</a-radio>
						<a-radio :value="false">无</a-radio>
					</a-radio-group>
				</a-col>
			</a-row>
			<a-row>
				<a-col span="6" align="left">分享文档</a-col>
				<a-col span="18" align="right">
					<a-radio-group name="modify_right" v-model="rightObj.share_right" :disabled="!rightObj.isleader">
						<a-radio :value="true">有</a-radio>
						<a-radio :value="false">无</a-radio>
					</a-radio-group>
				</a-col>
			</a-row>
			<a-row>
				<a-col span="6" align="left">参与讨论</a-col>
				<a-col span="18" align="right">
					<a-radio-group name="modify_right" v-model="rightObj.discuss_right" :disabled="!rightObj.isleader">
						<a-radio :value="true">有</a-radio>
						<a-radio :value="false">无</a-radio>
					</a-radio-group>
				</a-col>
			</a-row>
		</div>

		<div>
		<a-divider>{{this.rightObj.doctype==1?'协作者权限':'非团队成员权限'}}</a-divider>
		<a-row>
			<a-col span="6" align="left">修改文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.others_modify_right" :disabled="!rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">分享文档</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.others_share_right" :disabled="!rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row>
			<a-col span="6" align="left">参与讨论</a-col>
			<a-col span="18" align="right">
				<a-radio-group name="modify_right" v-model="rightObj.others_discuss_right" :disabled="!rightObj.isleader">
					<a-radio :value="true">有</a-radio>
					<a-radio :value="false">无</a-radio>
				</a-radio-group>
			</a-col>
		</a-row>
		</div>

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
				modify_right: false,
				share_right: false,
				discuss_right: false,

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
		propDocumentID:String,
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
		},
		DocumentID: {
			handler() {
				console.log("watch saw changes in DocumentID");
				console.log(this);
			},
			deep: true,
			immediate: true,
		}
	},

	methods: {
		commit() {
			var _this=this;
			console.log(this.rightObj);
			if(this.rightObj.doctype==1) {
				let formData = new FormData();
				formData.append("DocumentID", this.propDocumentID);
				
				formData.append("username", localStorage.getItem("token"));
				formData.append("others_share_right",this.rightObj.others_share_right?1:0);
				formData.append("others_discuss_right",this.rightObj.others_discuss_right?1:0);
				formData.append("others_modify_right",this.rightObj.others_modify_right?1:0);
				let config = {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				};
				axios
					.post("http://localhost:5000/api/modify_personal_doc_right/", formData, config)
					.then(function (response) {
						if (response.data.message=='success') {
							_this.$message.success('修改成功');
						} else {
							_this.$message.error('修改失败');
						}
					})
					.catch(function (error) {
						_this.$message.error('修改失败'+error);
					});
			} else {
				if(this.rightObj.isleader) {
					let formData = new FormData();
					formData.append("DocumentID", this.propDocumentID);
					formData.append("username", localStorage.getItem("token"));
					formData.append("share_right",this.rightObj.share_right?1:0);
					formData.append("discuss_right",this.rightObj.discuss_right?1:0);
					formData.append("modify_right",this.rightObj.modify_right?1:0);
					formData.append("others_share_right",this.rightObj.others_share_right?1:0);
					formData.append("others_discuss_right",this.rightObj.others_discuss_right?1:0);
					formData.append("others_modify_right",this.rightObj.others_modify_right?1:0);
					let config = {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					};
					axios
						.post("http://localhost:5000/api/modify_group_doc_right/", formData, config)
						.then(function (response) {
							if (response.data.message=='success') {
								_this.$message.success('修改成功');
							} else {
								_this.$message.error('修改失败');
							}
						})
						.catch(function (error) {
							_this.$message.error('修改失败'+error);
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
			this.rightObj.share_right=newVal.share_right;
			this.rightObj.usertype=newVal.usertype;
			this.rightObj.isleader=newVal.isleader;
		}
	},
}
</script>