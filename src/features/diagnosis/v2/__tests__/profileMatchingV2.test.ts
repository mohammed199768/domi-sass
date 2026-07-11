import assert from "node:assert/strict";
import { matchProfilesV2 } from "../profileMatching.js";
const s={averageCurrent:2,averageTarget:4,averageGap:2,topics:[{topicId:"t",topicKey:"t",dimensionId:"d",dimensionKey:"d",current:2,target:4,gap:2,weightedGap:6,priorityScore:6,weight:3,tags:[]}],dimensions:[{dimensionId:"d",dimensionKey:"d",averageCurrent:2,averageTarget:4,averageGap:2,priorityScore:6,weight:3}]};
const r=matchProfilesV2([{id:"broad",title:"b",conditions:{dimensionId:"d",gapMin:1}},{id:"specific",title:"s",conditions:[{dimensionId:"d",gapMin:1},{topicId:"t",gapMin:2}]}],s,{id:"fallback",title:"f"});assert.equal(r.selectedProfile.id,"specific");

