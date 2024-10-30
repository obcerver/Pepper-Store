import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor() { }

  //Method to add new Reward into the system
  addReward(addRewardForm) {

    const localStorageContent = localStorage.getItem('rewardItems')
    let rewards

    if(localStorageContent == null) {
      rewards = []
    }

    else {
      rewards = JSON.parse(localStorageContent)
    }

    rewards.push(addRewardForm.value)//Push form contain new reward data into array of all reward's data
    localStorage.setItem('rewardItems', JSON.stringify(rewards))
  }

  //Method to edit Reward
  editReward(awardArray, index, editRewardForm){

    awardArray.splice(index,1);//Remove outdated reward's data
    localStorage.removeItem('rewardItems')
    awardArray.push(editRewardForm.value)//Push newly edited reward's data

    //Sort the array of award by the awardId (ascending)
    awardArray.sort(function(a, b){
      if(a.rewardId < b.rewardId) { return -1; }
      if(a.rewardId > b.rewardId) { return 1; }
      return 0;
    })

    localStorage.setItem('rewardItems', JSON.stringify(awardArray))

  }

  //Method to remove selected reward from the system
  removeReward(rewardArray, reward) {

    //Deleted reward will be filtered out from the array that contain data of all rewards
    rewardArray = rewardArray.filter(function(rewardItem){
      return rewardItem.rewardId != reward.rewardId
    })

    localStorage.setItem('rewardItems', JSON.stringify(rewardArray))
  }
}
