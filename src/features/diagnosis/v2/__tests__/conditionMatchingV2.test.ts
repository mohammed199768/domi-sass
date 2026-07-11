import assert from "node:assert/strict";
import { combineConditionsV2, matchContextConditionsV2 } from "../conditionMatching.js";
const scores={averageCurrent:2,averageTarget:4,averageGap:2,topics:[{topicId:"t",topicKey:"t",dimensionId:"d",dimensionKey:"d",current:2,target:4,gap:2,weightedGap:6,priorityScore:6,weight:3,tags:["x"]}],dimensions:[{dimensionId:"d",dimensionKey:"d",averageCurrent:2,averageTarget:4,averageGap:2,priorityScore:6,weight:3}]};
assert.equal(combineConditionsV2({topicId:"t",gapMin:2},[{dimensionId:"d",currentMax:2}],[{tags:["x"]}],[{topicId:"t",gapMax:1}],scores).matched,true);assert.equal(combineConditionsV2({topicId:"t"},undefined,undefined,[{topicId:"t"}],scores).matched,false);assert.equal(matchContextConditionsV2([{fieldId:"booking",equals:"whatsapp"}],undefined,{booking:"whatsapp"}),true);

