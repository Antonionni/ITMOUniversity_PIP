import com.google.gson.Gson;
import entity.RowEntity;
import helper.ORMImpl;
import models.TableRow;

import javax.annotation.PreDestroy;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named
@ApplicationScoped
public class TableBean implements Serializable {
    private List<TableRow> table;
    TableBean() {
        table = new ArrayList<TableRow>();
    }
    public List<TableRow> getTable() {
        List<RowEntity> ormTable = ORMImpl.select();
        if (ormTable != null) {
            table.clear();
            for (final RowEntity entity: ormTable) {
                table.add(new TableRow(entity.getxValue(), entity.getyValue(), entity.getrValue(), entity.getHitting()));
            }
        }
        return table;
    }

    public String getJSON() {
        return new Gson().toJson(table);
    }

    @PreDestroy
    public void clearTable() {
        ORMImpl.clean();
    }

}
