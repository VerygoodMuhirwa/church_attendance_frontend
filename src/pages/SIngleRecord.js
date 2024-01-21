
const SingleRecord = () => {
  const userDatas = JSON.parse(localStorage.getItem("prevReportDatas"));
  console.log(userDatas);

  return (
    <>
    <div className="pt-[10%]">
      <table className="md:w-[30%]  border border-gray mx-auto ">
      <thead>
       <tr>
       <th className="border-[2px] p-3">Action</th>
        <th className="border-[2px] p-3">Uko cyakozwe</th>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abaje</td>
        <td className="border-[2px] p-3">{userDatas.yajeCount}</td>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abarwaye</td>
        <td className="border-[2px] p-3">{userDatas.yajeCount}</td>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abasuye</td>
        <td className="border-[2px] p-3">{userDatas.yarasuyeCount}</td>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abasuwe</td>
        <td className="border-[2px] p-3">{userDatas.yarasuweCount}</td>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abafafashije</td>
        <td className="border-[2px] p-3">{userDatas.yarafashijweCount}</td>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abafashijwe</td>
        <td className="border-[2px] p-3">{userDatas.yarafashijweCount}</td>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abize 7</td>
        <td className="border-[2px] p-3">{userDatas.yize7Count}</td>
       </tr>
       
       <tr>
       <td className="border-[2px] p-3">Abatangiye Isabato</td>
        <td className="border-[2px] p-3">{userDatas.yatangiyeIsabatoCount}</td>
       </tr>
       
      </thead>
      </table>
    </div>
    </>
    
  ) 
};

export default SingleRecord;
