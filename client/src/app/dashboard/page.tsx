"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  displayName: string;
  image: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUser = async () => {
    try {
      const response = await axios.get<{ user: UserData }>(
        "http://localhost:3001/login/success",
        { withCredentials: true }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="py-20">
      {userData ? (
        <div className="flex flex-col gap-2 py-20">
          <h1 className="text-4xl font-semibold">
            Hello, {userData.displayName}
          </h1>
          <p className="text-primary/75">What's on your menu today?</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 py-20">
          <h1 className="text-4xl font-semibold">Hello</h1>
          <p className="text-primary/75">What's on your menu today?</p>
        </div>
      )}
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
      reiciendis tempora distinctio ipsam dolore suscipit totam ad aut vero!
      Accusamus pariatur dignissimos dolore, sunt accusantium cum maiores est,
      assumenda autem omnis rem, deleniti vel ab odio porro. Perferendis minima
      soluta, commodi iusto tempora dignissimos exercitationem fugiat fuga. Unde
      quas incidunt cupiditate iusto odio commodi ex eum, deserunt in sunt
      laudantium quam nam numquam consequuntur modi ipsam ut, provident ab
      officia minima temporibus quia. Facere optio rem quaerat. Ab similique
      quam quaerat quod, deleniti velit iure modi. Ducimus dolorum optio ipsam
      dolores at, consectetur nostrum minima laborum, magni quas quidem error,
      laudantium illum explicabo deserunt nam vero veritatis sunt quo dicta
      consequuntur est! Quo dolores, impedit mollitia illo iusto inventore
      veniam, omnis vero incidunt ipsum dolor sed ad quidem quas assumenda
      excepturi amet voluptate, nemo repudiandae deserunt beatae! Quos, sapiente
      eligendi. Tempore quam reprehenderit quos vero. Optio esse eum, accusamus
      quos, at cupiditate magnam voluptas non sunt hic facere a consequuntur
      voluptatum laudantium saepe dolores obcaecati, ipsum laboriosam nisi
      repellendus? Quae delectus hic, ea nihil nulla ipsam quos soluta alias
      culpa temporibus veritatis! Earum voluptatum eaque alias eum adipisci
      eligendi magnam perferendis ipsam omnis voluptatem quaerat laudantium
      officiis suscipit totam tenetur, dolore accusamus possimus, perspiciatis
      aliquam molestias veniam doloribus neque. Quidem id sint nam cupiditate
      impedit officiis ratione autem ullam porro possimus. Sequi voluptatum
      facere quae sunt facilis, optio ea magnam odit accusamus aliquam dicta.
      Assumenda vel exercitationem, aut non voluptatum sequi impedit ipsum
      perferendis hic ea, atque id aliquid, minima explicabo soluta dolor
      laboriosam quidem. Obcaecati molestiae dolore sed officiis, tempore culpa
      quidem inventore repellendus quibusdam. Delectus aliquid expedita sunt
      quod quam tenetur iusto amet, nisi, quasi adipisci tempora quis quisquam
      voluptatem nihil! Voluptate esse neque quia quibusdam eum optio quos
      beatae nemo praesentium voluptatibus perspiciatis alias magnam, in
      corporis, dolores voluptatem perferendis doloribus! Ut architecto
      perspiciatis ipsam aliquid natus quam tempore inventore porro, corrupti
      maxime vero ratione deserunt odio mollitia accusamus ipsum rerum corporis
      esse! Distinctio, quidem? Quisquam rem nihil, eos nobis optio eligendi!
      Dolor ipsum dicta culpa beatae suscipit sequi voluptatibus eveniet sed
      ratione ea placeat omnis illo hic quisquam laborum fuga iure iusto,
      asperiores architecto, sapiente ex nesciunt dolorum! Adipisci expedita
      iste ut possimus perferendis, quo veritatis animi dolore laboriosam sint
      odio nemo sequi asperiores provident itaque quis praesentium perspiciatis
      recusandae commodi, voluptatem quam dolores at! Possimus qui distinctio
      quos odio sed ipsa obcaecati sint totam fugiat eos! Odio omnis dignissimos
      ad obcaecati nihil suscipit minima porro reiciendis ducimus, ipsum modi
      dicta officia neque itaque dolorem veritatis quod maxime quam deserunt
      iure hic. Quae alias debitis numquam esse, reprehenderit ducimus nostrum
      ipsam fugit in quod, quia labore soluta minima libero, magni voluptate
      unde dignissimos officia. Iste iusto dolorem iure eligendi maxime aliquam,
      vitae similique quidem fugit magni, ea reprehenderit tempora! Optio
      adipisci harum quidem sed unde quisquam deleniti consequuntur, aliquid
      saepe explicabo magnam, quod maxime a expedita nesciunt cupiditate quos,
      odit rerum ratione iusto sapiente porro nemo! Eius officiis voluptatem
      inventore ipsum aperiam! Dicta minus laudantium alias molestias saepe,
      neque illum omnis. Sunt velit iusto laboriosam ipsam dolorum dicta sint
      nobis. Voluptatum quas saepe molestiae dolor ex ipsum, rerum totam quam
      non illo inventore provident facere deserunt reiciendis unde ullam vel
      temporibus sapiente est veniam corporis voluptatibus repellendus.
      Laudantium hic quibusdam adipisci, excepturi alias facilis nostrum
      numquam? Eveniet, impedit consequuntur. Cum inventore voluptatibus
      reiciendis odit, placeat quasi beatae culpa unde error sequi nihil
      dolorum? Consectetur temporibus illo pariatur eum ex qui dicta omnis
      maiores distinctio repellat iste nam animi sapiente quis, explicabo
      voluptatem fuga rerum nostrum officia ratione harum nihil eligendi
      tempora. Odit libero saepe laboriosam excepturi enim perferendis
      voluptate, tenetur illo eaque aspernatur vel obcaecati aperiam molestias
      officia error pariatur quisquam, reprehenderit, modi iure ducimus quod
      ipsam. Autem est adipisci, mollitia ullam explicabo inventore voluptatem
      atque deserunt itaque rerum. Veritatis quasi sint id dolorum quo quam
      ipsam animi, repellat inventore placeat voluptatum. Perferendis et commodi
      ex qui ea distinctio, vitae ducimus labore ut atque necessitatibus
      corrupti impedit hic neque id molestiae expedita maxime culpa amet ratione
      tempora unde, error quia veritatis. Nobis, commodi. Eius, nemo excepturi
      distinctio esse earum accusantium necessitatibus cum veritatis aliquam
      dolore nesciunt ullam ipsum quibusdam facere optio minima assumenda ipsam,
      saepe quasi! Velit repudiandae eaque aliquam, suscipit provident
      praesentium magnam libero, mollitia expedita perspiciatis accusamus
      possimus quam sunt voluptate? Ab, amet hic laudantium autem magnam
      voluptatibus assumenda placeat expedita sed maxime asperiores tempora
      natus repellat quam consequuntur dolore. Accusantium delectus, doloremque
      aut modi odit quis voluptate libero quas error mollitia sit voluptatibus
      dolor officiis voluptatem accusamus sint incidunt quos nisi a. Cum
      nesciunt exercitationem iusto tenetur, facere officiis atque error qui
      nisi. Quaerat impedit suscipit, neque sint blanditiis, nemo accusamus
      nostrum delectus minima voluptatum cupiditate provident fugit est,
      asperiores doloribus! Eum, adipisci rerum rem repellendus esse provident
      voluptatum quia est, porro libero ab? Neque consectetur, odit sunt nisi
      eos molestias obcaecati, placeat quia repellendus delectus ut atque quas
      incidunt voluptatibus magnam perspiciatis veritatis fugiat in at dolorem
      exercitationem dolor optio enim minima! Ipsa similique distinctio vero
      impedit culpa? Accusamus architecto quo eos sit? A numquam quis natus
      labore nihil ducimus distinctio unde quae modi, veniam eum aut laborum
      repellendus praesentium odio necessitatibus inventore deleniti cum cumque
      sapiente! Voluptatum dolor vel nostrum eveniet recusandae dolores ex
      dignissimos rem nisi! Autem labore cupiditate, ducimus ex incidunt
      sapiente nesciunt quisquam sit consectetur, sed delectus sequi similique
      numquam hic maxime commodi doloremque est error neque? Dignissimos autem
      non quaerat, nisi odio voluptatem repellat iure aspernatur distinctio id
      molestiae doloribus nulla quasi consequuntur neque possimus rem. Quis eius
      voluptatibus neque cupiditate! Aperiam vel laboriosam, at sint animi eius
      illum a maxime odio nulla debitis amet vero accusantium doloremque commodi
      perferendis quis aspernatur tenetur sequi distinctio minima. Tempore
      necessitatibus recusandae ullam deleniti, officiis fuga tenetur aliquam
      similique voluptatibus quos amet? Libero vel repellat incidunt obcaecati
      numquam quidem, sed soluta earum id, totam voluptatem laborum voluptas
      molestias dignissimos laboriosam corporis natus. Omnis officiis quod
      tenetur et doloremque est nobis ullam consectetur rem iusto sequi quo,
      nihil sapiente nisi nostrum?
    </div>
  );
};

export default Dashboard;
