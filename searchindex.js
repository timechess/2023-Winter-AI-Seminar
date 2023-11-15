Object.assign(window.search, {"doc_urls":["写在前面.html#写在前面","第0章/index.html#第-0-章线性回归梦的开始","第0章/问题简述.html#问题简述","第0章/问题简述.html#问题解读","第0章/问题简述.html#数据细节","第0章/线性回归.html#线性回归"],"index":{"documentStore":{"docInfo":{"0":{"body":0,"breadcrumbs":0,"title":0},"1":{"body":0,"breadcrumbs":2,"title":1},"2":{"body":1,"breadcrumbs":1,"title":0},"3":{"body":14,"breadcrumbs":1,"title":0},"4":{"body":21,"breadcrumbs":1,"title":0},"5":{"body":0,"breadcrumbs":1,"title":0}},"docs":{"0":{"body":"","breadcrumbs":"写在前面 » 写在前面","id":"0","title":"写在前面"},"1":{"body":"","breadcrumbs":"第 0 章：线性回归——梦的开始 » 第 0 章：线性回归——梦的开始","id":"1","title":"第 0 章：线性回归——梦的开始"},"2":{"body":"为体现应用导向的设计理念，我们每章都会用一个或多个实际问题进行引入，并在对应章节中介绍解决该问题的方法与相关背景知识。这个实际问题将贯穿整个章节，每章的开头都会有 问题简述 一节对该问题进行具体介绍，包括通俗的表述与其形式化。下面是本章作为引入的问题。 Example 本书作者T在出行交通的花销上并没有提前计划的习惯，尤其在乘坐出租车或网约车时，对一程的费用没有具体的估计。然而，在一次乘车的花销触碰到他内心的底线后，他陷入了深思——他甚至不知道自己是不是被司机或者平台套路了。为了改变现状，他从各种渠道收集了出租车、网约车里程与费用的数据，希望能获得一个帮助他根据出行里程预估出行费用的机器学习模型。然而，由于作者T爬虫技能并不熟练，数据集由全国不同地方、不同平台、不同渠道的数据组成，且有10%左右的缺失值。 本书的案例大部分为虚构，如有雷同，纯属巧合！","breadcrumbs":"第 0 章：线性回归——梦的开始 » 问题简述 » 问题简述","id":"2","title":"问题简述"},"3":{"body":"这是一个典型的回归问题，若用符号语言对其稍加润色，即：给定数据集 D={(xi​,yi​)}i=1N​，其中 xi​ 为出行里程，yi​ 为费用，据此估计一个映射 ϕ，使其尽可能准确地根据 x 预测 y。 Hint 这里使用的符号 ϕ 并不指代某一具体函数，而可视为具有某种特定形式函数的等价类，如 ϕ(x)=w1​x+b1​ 与 ϕ(x)=w2​x+b2​ 在这一语义下均可用 ϕ 表示，对于其中参数 w,b 的区分，我们统一使用 ϕ(x;θ) 来表示具有特定参数 θ 的 ϕ。在上述例子中 ϕ 是一元多项式，而后 ϕ 可能表示 CNN、RNN 等较难写出显式表达式的模型。 对该问题稍加分析即知，用简单的线性函数 ϕ(x)=wx+b 是无法很好地拟合数据集的。以初高中常出的出租车计价问题来看，数据集中包含着来源于不同计价规则的数据，即起步价不同、每公里费用不同，甚至可能存在不同的阶梯计价模式。再考虑网约车的复杂生态以及缺失值、数据噪声等因素，我们基本可以断定单纯的线性回归是无法有效解决这一问题的，虽然我们确实可以简单地得到这一形式下的最优解。 关于如何刻画准确性，我们可以将其简单转化为均方误差，这样我们就成功将问题的形式化如下： (ϕ,θ)argmin​∥ϕ(x;θ)−y∥22​ 这里采用向量化的书写方法，即 x=(x1​,…,xN​),y=(y1​,…,yN​)。 事实上，我们一般采用人工指定 ϕ 后使用各种优化算法求解 θ 的形式来解决问题，而 ϕ 的选取问题十分复杂，这里不做过多展开。","breadcrumbs":"第 0 章：线性回归——梦的开始 » 问题简述 » 问题解读","id":"3","title":"问题解读"},"4":{"body":"本章问题为作者原创，故并没有真实数据集可供下载，并且我们并没有真的写爬虫去收集相关数据（如果有人愿意去做这件事那我们也欢迎PR）。好消息是，我们通过程序生成了符合要求的数据集，并且凭此实现了数据集特征的高度自定义化。下面将阐述数据集生成的具体流程。 虽然各地、各平台的计价规则在细节上并不相同，但我们假定其遵循一套共同的框架，即阶梯计价。 定义计价规则 R={c0​,s0​,c1​,s1​,…,cn​}，其中 s0​ 为起步里程，c0​ 为起步价，si​(i≥1) 为第 i 个阶梯的终止点，ci​(i≥1) 为第 i 个阶梯的里程单价，在 sn−1​ 之后的里程单价固定为 cn​，即在计价规则 R 下，理论费用 CR​(x) 计算公式如下（这里记 sn​=∞ 以简化公式）： CR​(x)=c0​+i=1∑n​ci​I(x≥si−1​)min(x−si−1​,si​−si−1​) 这里 I 为示性函数，即 I(True)=1,I(False)=0。 对于不同的计价规则，{si​},{ci​},n 均不同，我们假定 n∈{1,2,3,4,5}，s0​∈[2,5],c0​∈[5,15],ci​∈[2,5]，每个阶梯区间长度 si​−si−1​∈[20,100],i≥1，由此随机生成规则，对每套生成的规则再随机生成一定数量的数据对，将其合并作为数据集。 为模拟数据的噪声与缺失，实际费用 CR′​(x) 计算时加入误差项 ϵ，即： CR′​(xi​)=CR​(x)+ϵi​ 这里我们设 ϵ∼N(10,252)。 另外，生成数据时有 0.1 的概率生成缺失值，即计算得到 (x,CR′​(x)) 后，有 0.1 的概率将其中的某个值替换为 nan，其中两者均有 0.5 的概率被替换，但不会都被替换，即假设完全缺失的数据已经被清洗掉了。 生成后我们得到的完整数据集实际上为 D={x,y,R}，包含数据点与其生成规则之间的对应关系，但实践中该关系被隐去了，即我们不知道数据集是由几套计价规则生成的，也不知道每个数据点对应哪一套规则、哪些数据点是由同一套规则生成的。 Hint 虽然使用表达能力强的模型往往可以忽略不同规则生成数据之间的差异而达到较好的拟合效果，但相应的其可解释性也大大降低了，我们很难从结果中获取到更多人类可理解的信息。 通过自定义上述数据生成流程，改变其中参数，即可一定程度上自定义数据集特征（以及难度）。该部分数据生成代码参看 项目仓库 。","breadcrumbs":"第 0 章：线性回归——梦的开始 » 问题简述 » 数据细节","id":"4","title":"数据细节"},"5":{"body":"","breadcrumbs":"第 0 章：线性回归——梦的开始 » 线性回归 » 线性回归","id":"5","title":"线性回归"}},"length":6,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"0":{".":{"1":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}},"5":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"1":{"tf":1.0}}},"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"df":0,"docs":{},"m":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"​":{"df":0,"docs":{},"∥":{"df":0,"docs":{},"ϕ":{"(":{"df":0,"docs":{},"x":{";":{"df":0,"docs":{},"θ":{")":{"df":0,"docs":{},"−":{"df":0,"docs":{},"y":{"df":0,"docs":{},"∥":{"2":{"2":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}}},"c":{"0":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"i":{"df":0,"docs":{},"≥":{"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"n":{"df":1,"docs":{"4":{"tf":1.0}},"n":{"df":0,"docs":{},"、":{"df":0,"docs":{},"r":{"df":0,"docs":{},"n":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"r":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}},"′":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{"df":1,"docs":{"4":{"tf":1.0}},"i":{"df":0,"docs":{},"​":{")":{"=":{"c":{"df":0,"docs":{},"r":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{")":{"+":{"df":0,"docs":{},"ϵ":{"df":0,"docs":{},"i":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}}}},"d":{"=":{"df":0,"docs":{},"{":{"(":{"df":0,"docs":{},"x":{"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"y":{"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{")":{"df":0,"docs":{},"}":{"df":0,"docs":{},"i":{"=":{"1":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{},"e":{"df":0,"docs":{},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"h":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}}}}},"i":{"(":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"u":{"df":0,"docs":{},"e":{")":{"=":{"1":{",":{"df":0,"docs":{},"i":{"(":{"df":0,"docs":{},"f":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{")":{"=":{"0":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"n":{"(":{"1":{"0":{",":{"2":{"5":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}},"r":{"=":{"df":0,"docs":{},"{":{"c":{"0":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"s":{"0":{"df":0,"docs":{},"​":{",":{"c":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"s":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"…":{",":{"c":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":1,"docs":{"4":{"tf":1.0}}},"s":{"0":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"i":{"df":0,"docs":{},"≥":{"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{},"}":{",":{"df":0,"docs":{},"{":{"c":{"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{"df":0,"docs":{},"}":{",":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"n":{"df":1,"docs":{"4":{"tf":1.0}},"−":{"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}},"w":{",":{"b":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"x":{")":{"=":{"df":0,"docs":{},"w":{"1":{"df":0,"docs":{},"​":{"df":0,"docs":{},"x":{"+":{"b":{"1":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}},"2":{"df":0,"docs":{},"​":{"df":0,"docs":{},"x":{"+":{"b":{"2":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{},"x":{"+":{"b":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}},",":{"c":{"df":0,"docs":{},"r":{"df":0,"docs":{},"′":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"=":{"(":{"df":0,"docs":{},"x":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"…":{",":{"df":0,"docs":{},"x":{"df":0,"docs":{},"n":{"df":0,"docs":{},"​":{")":{",":{"df":0,"docs":{},"y":{"=":{"(":{"df":0,"docs":{},"y":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"…":{",":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":1,"docs":{"3":{"tf":1.4142135623730951}},"i":{"df":1,"docs":{"3":{"tf":1.0}}}},"y":{"df":1,"docs":{"3":{"tf":1.0}},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"breadcrumbs":{"root":{"0":{".":{"1":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}},"5":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":5,"docs":{"1":{"tf":1.7320508075688772},"2":{"tf":1.0},"3":{"tf":1.0},"4":{"tf":1.0},"5":{"tf":1.0}}},"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"df":0,"docs":{},"m":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"​":{"df":0,"docs":{},"∥":{"df":0,"docs":{},"ϕ":{"(":{"df":0,"docs":{},"x":{";":{"df":0,"docs":{},"θ":{")":{"df":0,"docs":{},"−":{"df":0,"docs":{},"y":{"df":0,"docs":{},"∥":{"2":{"2":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}}},"c":{"0":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"i":{"df":0,"docs":{},"≥":{"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"n":{"df":1,"docs":{"4":{"tf":1.0}},"n":{"df":0,"docs":{},"、":{"df":0,"docs":{},"r":{"df":0,"docs":{},"n":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"r":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}},"′":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{"df":1,"docs":{"4":{"tf":1.0}},"i":{"df":0,"docs":{},"​":{")":{"=":{"c":{"df":0,"docs":{},"r":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{")":{"+":{"df":0,"docs":{},"ϵ":{"df":0,"docs":{},"i":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}}}},"d":{"=":{"df":0,"docs":{},"{":{"(":{"df":0,"docs":{},"x":{"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"y":{"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{")":{"df":0,"docs":{},"}":{"df":0,"docs":{},"i":{"=":{"1":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{},"e":{"df":0,"docs":{},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}},"h":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}}}}},"i":{"(":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"u":{"df":0,"docs":{},"e":{")":{"=":{"1":{",":{"df":0,"docs":{},"i":{"(":{"df":0,"docs":{},"f":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{")":{"=":{"0":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"n":{"(":{"1":{"0":{",":{"2":{"5":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}},"r":{"=":{"df":0,"docs":{},"{":{"c":{"0":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"s":{"0":{"df":0,"docs":{},"​":{",":{"c":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"s":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"…":{",":{"c":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":1,"docs":{"4":{"tf":1.0}}},"s":{"0":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"i":{"df":0,"docs":{},"≥":{"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}},"df":0,"docs":{},"}":{",":{"df":0,"docs":{},"{":{"c":{"df":0,"docs":{},"i":{"df":0,"docs":{},"​":{"df":0,"docs":{},"}":{",":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"n":{"df":1,"docs":{"4":{"tf":1.0}},"−":{"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}},"w":{",":{"b":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"x":{")":{"=":{"df":0,"docs":{},"w":{"1":{"df":0,"docs":{},"​":{"df":0,"docs":{},"x":{"+":{"b":{"1":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}},"2":{"df":0,"docs":{},"​":{"df":0,"docs":{},"x":{"+":{"b":{"2":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{},"x":{"+":{"b":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}},",":{"c":{"df":0,"docs":{},"r":{"df":0,"docs":{},"′":{"df":0,"docs":{},"​":{"(":{"df":0,"docs":{},"x":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"=":{"(":{"df":0,"docs":{},"x":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"…":{",":{"df":0,"docs":{},"x":{"df":0,"docs":{},"n":{"df":0,"docs":{},"​":{")":{",":{"df":0,"docs":{},"y":{"=":{"(":{"df":0,"docs":{},"y":{"1":{"df":0,"docs":{},"​":{",":{"df":0,"docs":{},"…":{",":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":1,"docs":{"3":{"tf":1.4142135623730951}},"i":{"df":1,"docs":{"3":{"tf":1.0}}}},"y":{"df":1,"docs":{"3":{"tf":1.0}},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"title":{"root":{"0":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});