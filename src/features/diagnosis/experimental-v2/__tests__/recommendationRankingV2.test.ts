import assert from "node:assert/strict";
import { rankRecommendationsV2 } from "../recommendationRankingV2.js";
const s={averageCurrent:2,averageTarget:4,averageGap:2,topics:[{topicId:"t",topicKey:"t",dimensionId:"d",dimensionKey:"d",current:1,target:5,gap:4,weightedGap:12,priorityScore:12,weight:3,tags:["x"]}],dimensions:[{dimensionId:"d",dimensionKey:"d",averageCurrent:1,averageTarget:5,averageGap:4,priorityScore:12,weight:3}]};
const r=rankRecommendationsV2([{id:"broad",title:"b",category:"quickWins",priority:4,conditions:{tags:["x"]},effort:5},{id:"specific",title:"s",category:"quickWins",priority:3,conditions:{topicId:"t"},impact:5,urgency:5,effort:1}],s,"p");assert.equal(r[0].recommendation.id,"specific");
