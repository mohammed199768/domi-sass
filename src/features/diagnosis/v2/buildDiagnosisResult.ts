import { matchProfilesV2 } from "./profileMatching";
import { rankRecommendationsV2 } from "./recommendationRanking";
import { selectRecommendationsV2 } from "./recommendationSelection";
import type { DimensionScoreV2, DimensionV2, ProfileV2, RecommendationPolicyV2, RecommendationV2, ScoreSetV2, TopicScoreV2 } from "./types";
const round=(n:number)=>Math.round(n*10)/10;const avg=(a:Array<{value:number;weight:number}>)=>round(a.reduce((s,x)=>s+x.value*x.weight,0)/a.reduce((s,x)=>s+x.weight,0));
export function scoreV2(dimensions:DimensionV2[],answers:Record<string,{current:number;target:number}>):ScoreSetV2 {
  const topics:TopicScoreV2[]=dimensions.flatMap(d=>d.topics.map(t=>{const a=answers[t.id]||{current:1,target:1},current=Math.max(1,Math.min(5,a.current)),target=Math.max(1,Math.min(5,a.target)),gap=round(Math.max(0,target-current));return {topicId:t.id,topicKey:t.topicKey,dimensionId:d.id,dimensionKey:d.dimensionKey,current,target,gap,weightedGap:round(gap*t.weight),priorityScore:round(gap*t.weight),weight:t.weight,tags:t.tags};}));
  const ds:DimensionScoreV2[]=dimensions.map(d=>{const ts=topics.filter(t=>t.dimensionId===d.id);const averageCurrent=avg(ts.map(t=>({value:t.current,weight:t.weight}))),averageTarget=avg(ts.map(t=>({value:t.target,weight:t.weight}))),averageGap=avg(ts.map(t=>({value:t.gap,weight:t.weight})));return {dimensionId:d.id,dimensionKey:d.dimensionKey,averageCurrent,averageTarget,averageGap,priorityScore:round(averageGap*d.weight),weight:d.weight};});
  const averageCurrent=avg(ds.map(d=>({value:d.averageCurrent,weight:d.weight}))), averageTarget=avg(ds.map(d=>({value:d.averageTarget,weight:d.weight})));
  return {topics,dimensions:ds,averageCurrent,averageTarget,averageGap:round(Math.max(0,averageTarget-averageCurrent))};
}
export function buildDiagnosisResultV2(input:{dimensions:DimensionV2[];profiles:ProfileV2[];recommendations:RecommendationV2[];answers:Record<string,{current:number;target:number}>;fallbackProfile:ProfileV2;policy?:RecommendationPolicyV2;context?:Record<string,string>}) {const scores=scoreV2(input.dimensions,input.answers),profile=matchProfilesV2(input.profiles,scores,input.fallbackProfile),ranked=rankRecommendationsV2(input.recommendations,scores,profile.selectedProfile.id,input.context),selection=selectRecommendationsV2(ranked,scores,input.policy);return {scores,profile,ranked,selection};}
