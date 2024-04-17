export function timeDifference(date: Date): string {
    const currentDate = new Date();
    if(date.getDay() === currentDate.getDay() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()){
        return "Today"
    }
    const diffTime = Math.abs(currentDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays > 1 && diffDays <= 30) {
      return `Past ${diffDays} days`;
    } else if (diffDays > 30 && diffDays <= 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `Last ${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
    } else if (diffDays > 365) {
      return 'Last this year';
    } else {
      return 'Today';
    }
  }
  

  export const BASE_URL = "https://beyondzero.onrender.com"