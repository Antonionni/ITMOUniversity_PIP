import entity.RowEntity;
import helper.ORMImpl;
import models.TableRow;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named
@ApplicationScoped
public class TableBean implements Serializable {
    public List<TableRow> getTable() {
        List<RowEntity> ormTable = ORMImpl.select();
        List<TableRow> table = new ArrayList<TableRow>();
        if (ormTable != null) {
            for (final RowEntity entity: ormTable) {
                table.add(new TableRow(entity.getxValue(), entity.getyValue(), entity.getrValue(), entity.getHitting()));
            }
        }
        return table;
    }

    public void clearTable() {
        ORMImpl.clean();
    }

}
